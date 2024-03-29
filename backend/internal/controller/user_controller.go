package controller

import (
	"fmt"
	entity "go-jwt/internal/entity"
	middleware "go-jwt/internal/middleware"
	request "go-jwt/internal/request"
	token "go-jwt/internal/token"
	usecase "go-jwt/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	userService    usecase.UserUsecase
	NewUserRequest func() request.UserRequest
}

func SetupUserRoutes(router *gin.Engine, userService usecase.UserUsecase) {
	userController := UserController{
		userService:    userService,
		NewUserRequest: request.NewUserRequest,
	}
	publicRoutes := router.Group("/public")
	{
		publicRoutes.Use(middleware.CORS())
		publicRoutes.POST("/login", userController.login)
		publicRoutes.POST("/", userController.create)
	}
	userRoutes := router.Group("/users").Use(middleware.JwtAuthMiddleware())
	{
		userRoutes.Use(middleware.CORS())
		userRoutes.POST("/", userController.create)
		userRoutes.GET("/:id", userController.get)
		userRoutes.PUT("/:id", userController.update)
		userRoutes.DELETE("/:id", userController.delete)
		//userRoutes.POST("/login", userController.login)
		userRoutes.GET("/currentuser", getCurrentUserID)
	}
}

func getCurrentUserID(c *gin.Context) {
	userID, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success", "ID": userID})
}

func (h UserController) login(ctx *gin.Context) {
	request := h.NewUserRequest()

	if err := request.Bind(ctx); err != nil {
		fmt.Println("bind user failed:", err.Error())
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	user, token, err := h.userService.AuthenticateUser(ctx, request.GetUsername(), request.GetPassword())

	if err != nil {
		fmt.Println("login user failed:", err.Error())
		// ctx.AbortWithError(http.StatusBadRequest, err)
		// 404 not found http status code
		ctx.JSON(http.StatusNotFound, gin.H{"message": "login failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"token": token, "user": user})
}
func (h UserController) create(ctx *gin.Context) {
	request := h.NewUserRequest()

	if err := request.Bind(ctx); err != nil {
		fmt.Println("bind user failed:", err.Error())
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// if err := request.Validate(); err != nil {
	// 	fmt.Println("validate user failed", err.Error())
	// 	ctx.AbortWithError(http.StatusBadRequest, err)
	// 	return
	// }

	user, error := h.userService.CreateUser(ctx, &entity.User{
		Username:      request.GetUsername(),
		Password:      request.GetPassword(),
		Name:          request.GetName(),
		Phonenum:      request.GetPhonenum(),
		Age:           request.GetAge(),
		Gender:        request.GetGender(),
		SSN:           request.GetSSN(),
		Role:          request.GetRole(),
		CountFine:     request.GetCountFine(),
		ReservingList: request.GetReservingList(),
		BorrowingList: request.GetBorrowingList(),
		BorrowedList:  request.GetBorrowedList(),
	})
	if error != nil {
		fmt.Println("create user failed:", error.Error())
		// ctx.AbortWithError(http.StatusBadRequest, error)
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "create failed", "error": error.Error()})
	}
	ctx.JSON(http.StatusOK, user)
}

func (h UserController) get(ctx *gin.Context) {

	request := h.NewUserRequest()

	user, err := h.userService.GetUser(ctx, request.GetIDFromURL(ctx))

	if err != nil {
		fmt.Println("get user failed:", err.Error())
		// ctx.AbortWithError(http.StatusBadRequest, err)
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "get failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, user)
}

func (h UserController) update(ctx *gin.Context) {
	request := h.NewUserRequest()

	if err := request.Bind(ctx); err != nil {
		fmt.Println("bind user failed:", err.Error())
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	user, err := h.userService.UpdateUser(ctx, request.GetIDFromURL(ctx), &entity.User{
		Username:      request.GetUsername(),
		Password:      request.GetPassword(),
		Name:          request.GetName(),
		Phonenum:      request.GetPhonenum(),
		Age:           request.GetAge(),
		Gender:        request.GetGender(),
		SSN:           request.GetSSN(),
		Role:          request.GetRole(),
		CountFine:     request.GetCountFine(),
		ReservingList: request.GetReservingList(),
		BorrowingList: request.GetBorrowingList(),
		BorrowedList:  request.GetBorrowedList(),
	})

	if err != nil {
		fmt.Println("update user failed:", err.Error())
		// ctx.AbortWithError(http.StatusBadRequest, err)
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "update failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, user)
}

func (h UserController) delete(ctx *gin.Context) {
	request := h.NewUserRequest()

	err := h.userService.DeleteUser(ctx, request.GetIDFromURL(ctx))

	if err != nil {
		fmt.Println("delete user failed:", err.Error())
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "user deleted"})
}
