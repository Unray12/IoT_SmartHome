package controller

import (
	"bytes"
	"encoding/json"
	"fmt"
	"go-jwt/internal/middleware"
	request "go-jwt/internal/request"
	usecase "go-jwt/internal/usecase"
	"io"
	"net/http"
	"strconv"

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

	// publicRoutes := router.Group("/public")
	// {
	// 	publicRoutes.Use(middleware.CORS())
	// 	publicRoutes.POST("/login", userController.login)
	// 	publicRoutes.POST("/", userController.create)
	// }

	// userRoutes := router.Group("/users").Use(middleware.JwtAuthMiddleware())
	// {
	// 	userRoutes.Use(middleware.CORS())
	// 	userRoutes.POST("/", userController.create)
	// 	userRoutes.GET("/:id", userController.get)
	// 	userRoutes.PUT("/:id", userController.update)
	// 	userRoutes.DELETE("/:id", userController.delete)
	// 	//userRoutes.POST("/login", userController.login)
	// 	userRoutes.GET("/currentuser", getCurrentUserID)
	// }
	userRoutes := router.Group("/users")
	{
		userRoutes.Use(middleware.CORS())
		userRoutes.GET("/:id", userController.get)
		userRoutes.POST("/turnOnLight", userController.turnOnLight)
		userRoutes.POST("/turnOffLight", userController.turnOffLight)
		userRoutes.POST("/turnOnFan", userController.turnOnFan)
		userRoutes.POST("/turnOffFan", userController.turnOffFan)
		userRoutes.POST("/updateFanSpeed", userController.updateFanSpeed)
		userRoutes.GET("/getTempAndHumid", userController.getTempAndHumid)
	}
}

// func getCurrentUserID(c *gin.Context) {
// 	userID, err := token.ExtractTokenID(c)

// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "success", "ID": userID})
// }

// func (h UserController) login(ctx *gin.Context) {
// 	request := h.NewUserRequest()

// 	if err := request.Bind(ctx); err != nil {
// 		fmt.Println("bind user failed:", err.Error())
// 		ctx.AbortWithError(http.StatusBadRequest, err)
// 		return
// 	}

// 	user, token, err := h.userService.AuthenticateUser(ctx, request.GetUsername(), request.GetPassword())

// 	if err != nil {
// 		fmt.Println("login user failed:", err.Error())
// 		// ctx.AbortWithError(http.StatusBadRequest, err)
// 		// 404 not found http status code
// 		ctx.JSON(http.StatusNotFound, gin.H{"message": "login failed", "error": err.Error()})
// 		return
// 	}

// 	ctx.JSON(http.StatusOK, gin.H{"token": token, "user": user})
// }
// func (h UserController) create(ctx *gin.Context) {
// 	request := h.NewUserRequest()

// 	if err := request.Bind(ctx); err != nil {
// 		fmt.Println("bind user failed:", err.Error())
// 		ctx.AbortWithError(http.StatusBadRequest, err)
// 		return
// 	}

// 	// if err := request.Validate(); err != nil {
// 	// 	fmt.Println("validate user failed", err.Error())
// 	// 	ctx.AbortWithError(http.StatusBadRequest, err)
// 	// 	return
// 	// }

// 	user, error := h.userService.CreateUser(ctx, &entity.User{
// 		Username:      request.GetUsername(),
// 		Password:      request.GetPassword(),
// 		Name:          request.GetName(),
// 		Phonenum:      request.GetPhonenum(),
// 		Age:           request.GetAge(),
// 		Gender:        request.GetGender(),
// 		SSN:           request.GetSSN(),
// 		Role:          request.GetRole(),
// 		CountFine:     request.GetCountFine(),
// 		ReservingList: request.GetReservingList(),
// 		BorrowingList: request.GetBorrowingList(),
// 		BorrowedList:  request.GetBorrowedList(),
// 	})
// 	if error != nil {
// 		fmt.Println("create user failed:", error.Error())
// 		// ctx.AbortWithError(http.StatusBadRequest, error)
// 		ctx.JSON(http.StatusBadRequest, gin.H{"message": "create failed", "error": error.Error()})
// 	}
// 	ctx.JSON(http.StatusOK, user)
// }

func (h UserController) get(ctx *gin.Context) {

	request := h.NewUserRequest()
	id, err := strconv.Atoi(request.GetIDFromURL(ctx))
	if err != nil {
		fmt.Println("get user failed:", err.Error())
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "get failed", "error": err.Error()})
		return
	}
	user, err := h.userService.GetUser(id)

	if err != nil {
		fmt.Println("get user failed:", err.Error())
		// ctx.AbortWithError(http.StatusBadRequest, err)
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "get failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, user)
}

// func (h UserController) update(ctx *gin.Context) {
// 	request := h.NewUserRequest()

// 	if err := request.Bind(ctx); err != nil {
// 		fmt.Println("bind user failed:", err.Error())
// 		ctx.AbortWithError(http.StatusBadRequest, err)
// 		return
// 	}

// 	user, err := h.userService.UpdateUser(ctx, request.GetIDFromURL(ctx), &entity.User{
// 		Username:      request.GetUsername(),
// 		Password:      request.GetPassword(),
// 		Name:          request.GetName(),
// 		Phonenum:      request.GetPhonenum(),
// 		Age:           request.GetAge(),
// 		Gender:        request.GetGender(),
// 		SSN:           request.GetSSN(),
// 		Role:          request.GetRole(),
// 		CountFine:     request.GetCountFine(),
// 		ReservingList: request.GetReservingList(),
// 		BorrowingList: request.GetBorrowingList(),
// 		BorrowedList:  request.GetBorrowedList(),
// 	})

// 	if err != nil {
// 		fmt.Println("update user failed:", err.Error())
// 		// ctx.AbortWithError(http.StatusBadRequest, err)
// 		ctx.JSON(http.StatusBadRequest, gin.H{"message": "update failed", "error": err.Error()})
// 		return
// 	}

// 	ctx.JSON(http.StatusOK, user)
// }

// func (h UserController) delete(ctx *gin.Context) {
// 	request := h.NewUserRequest()

// 	err := h.userService.DeleteUser(ctx, request.GetIDFromURL(ctx))

// 	if err != nil {
// 		fmt.Println("delete user failed:", err.Error())
// 		ctx.AbortWithError(http.StatusBadRequest, err)
// 		return
// 	}

// 	ctx.JSON(http.StatusOK, gin.H{"message": "user deleted"})
// }

// func (h UserController) get(ctx *gin.Context) {
// 	ctx.JSON(http.StatusOK, gin.H{"message": "user deleted"})
// }

func (h UserController) turnOnLight(ctx *gin.Context) {

	// username := "your_username"
	// apiKey := "your_api_key"

	// Build the API endpoint URL
	baseURL := "https://io.adafruit.com/api/v2/webhooks/feed/Ye9oEbz9VvPgzjLYzjz7dDC8R1dL"
	// url := fmt.Sprintf("%s?X-ADAFRUIT-IO-KEY=%s", baseURL, apiKey)

	jsonData := map[string]string{
		"value": "Alarm On",
	}

	// Convert JSON data to bytes
	jsonDataBytes, err := json.Marshal(jsonData)
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}

	// Create a new HTTP client
	client := &http.Client{}

	// Create a POST request with the JSON data
	req, err := http.NewRequest(http.MethodPost, baseURL, bytes.NewReader(jsonDataBytes))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Set the request headers
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}

	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	// Print the response status code and body
	fmt.Println("Status code:", resp.StatusCode)
	fmt.Println("Response body:", string(body))
}

func (h UserController) turnOffLight(ctx *gin.Context) {

	// username := "your_username"
	// apiKey := "your_api_key"

	// Build the API endpoint URL
	baseURL := "https://io.adafruit.com/api/v2/webhooks/feed/Ye9oEbz9VvPgzjLYzjz7dDC8R1dL"
	// url := fmt.Sprintf("%s?X-ADAFRUIT-IO-KEY=%s", baseURL, apiKey)

	// Create the data you want to send
	jsonData := map[string]string{
		"value": "Alarm Off",
	}

	// Convert JSON data to bytes
	jsonDataBytes, err := json.Marshal(jsonData)
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}

	// Create a new HTTP client
	client := &http.Client{}

	// Create a POST request with the JSON data
	req, err := http.NewRequest(http.MethodPost, baseURL, bytes.NewReader(jsonDataBytes))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Set the request headers
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}

	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	// Print the response body
	fmt.Println("Response body:", string(body))
}

func (h UserController) getTempAndHumid(ctx *gin.Context) {
	// request := h.NewUserRequest()
	// house_id, err := strconv.Atoi(request.GetHouseIDFromURL(ctx))
	// if err != nil {
	// 	fmt.Println("get user failed:", err.Error())
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"message": "get failed", "error": err.Error()})
	// 	return
	// }
	temperature, humid, err := h.userService.GetTempAndHumid(1)

	if err != nil {
		fmt.Println("get temperature and humidity failed:", err.Error())
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "get temperature and humidity failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"temperature": temperature, "humidity": humid})
}

func (h UserController) updateFanSpeed(ctx *gin.Context) {

	body, err := io.ReadAll(ctx.Request.Body)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read request body"})
		return
	}

	// Define struct to unmarshal JSON into
	var data map[string]interface{}

	// Unmarshal JSON into the struct
	if err := json.Unmarshal(body, &data); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse JSON"})
		return
	}
	// Extract "fan_speed" values from the JSON
	fan_speed, ok := data["fan_speed"].(float64)
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or missing 'fan_speed' value"})
		return
	}
	// username := "your_username"
	// apiKey := "your_api_key"

	// Build the API endpoint URL
	baseURL := "https://io.adafruit.com/api/v2/webhooks/feed/GDfmkBYDyWBUV6A6M17stLHytSEM"
	// url := fmt.Sprintf("%s?X-ADAFRUIT-IO-KEY=%s", baseURL, apiKey)

	// Create the data you want to send
	jsonData := map[string]string{
		"value": strconv.FormatFloat(fan_speed, 'f', -1, 64),
	}

	// Convert JSON data to bytes
	jsonDataBytes, err := json.Marshal(jsonData)
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}

	// Create a new HTTP client
	client := &http.Client{}

	// Create a POST request with the JSON data
	req, err := http.NewRequest(http.MethodPost, baseURL, bytes.NewReader(jsonDataBytes))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Set the request headers
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}

	defer resp.Body.Close()

	// Read the response body
	bodyResponse, err1 := io.ReadAll(resp.Body)
	if err1 != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	// Print the response body
	fmt.Println("Response body:", string(bodyResponse))
}

func (h UserController) turnOnFan(ctx *gin.Context) {

	// username := "your_username"
	// apiKey := "your_api_key"

	// Build the API endpoint URL
	baseURL := "https://io.adafruit.com/api/v2/webhooks/feed/9xJ4R9ZM7A9tKEeJcaJh9rS7t6L5"
	// url := fmt.Sprintf("%s?X-ADAFRUIT-IO-KEY=%s", baseURL, apiKey)

	// Create the data you want to send
	jsonData := map[string]string{
		"value": "Fan On",
	}

	// Convert JSON data to bytes
	jsonDataBytes, err := json.Marshal(jsonData)
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}

	// Create a new HTTP client
	client := &http.Client{}

	// Create a POST request with the JSON data
	req, err := http.NewRequest(http.MethodPost, baseURL, bytes.NewReader(jsonDataBytes))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Set the request headers
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}

	defer resp.Body.Close()

	// Read the response body
	bodyResponse, err1 := io.ReadAll(resp.Body)
	if err1 != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	// Print the response body
	fmt.Println("Response body:", string(bodyResponse))
}

func (h UserController) turnOffFan(ctx *gin.Context) {

	// username := "your_username"
	// apiKey := "your_api_key"

	// Build the API endpoint URL
	baseURL := "https://io.adafruit.com/api/v2/webhooks/feed/9xJ4R9ZM7A9tKEeJcaJh9rS7t6L5"
	// url := fmt.Sprintf("%s?X-ADAFRUIT-IO-KEY=%s", baseURL, apiKey)

	// Create the data you want to send
	jsonData := map[string]string{
		"value": "Fan Off",
	}

	// Convert JSON data to bytes
	jsonDataBytes, err := json.Marshal(jsonData)
	if err != nil {
		fmt.Println("Error encoding JSON:", err)
		return
	}

	// Create a new HTTP client
	client := &http.Client{}

	// Create a POST request with the JSON data
	req, err := http.NewRequest(http.MethodPost, baseURL, bytes.NewReader(jsonDataBytes))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Set the request headers
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}

	defer resp.Body.Close()

	// Read the response body
	bodyResponse, err1 := io.ReadAll(resp.Body)
	if err1 != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	// Print the response body
	fmt.Println("Response body:", string(bodyResponse))
}
