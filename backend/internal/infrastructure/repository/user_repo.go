package repository

import (
	"fmt"
	entity "go-jwt/internal/entity"

	"gorm.io/gorm"
)

type UserRepository interface {
	GetUserByID(id int) (*entity.User, error)
	GetUserByUsername(username string) (*entity.User, error)
	GetTempAndHumid(house_id int) (float64, float64, error)
	GetHouseID(userID int) ([]int, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) UserRepository {
	return &userRepository{
		db: db,
	}
}

func (userRepo *userRepository) GetUserByID(id int) (*entity.User, error) {
	user := entity.User{}

	err := userRepo.db.Table("Users").Where("User_id = ?", id).First(&user).Error

	if err != nil {
		fmt.Print("Error", err)
		return nil, err
	}
	return &user, nil
}

func (userRepo *userRepository) GetUserByUsername(username string) (*entity.User, error) {
	user := entity.User{}

	err := userRepo.db.Table("Users").Where("Username = ?", username).First(&user).Error

	if err != nil {
		fmt.Print("Error", err)
		return nil, err
	}

	return &user, nil
}

func (userRepo *userRepository) GetTempAndHumid(house_id int) (float64, float64, error) {
	var temp float64
	var humid float64
	err := userRepo.db.Table("Iot_device").Where("House_id = ? and Device_type = ?", house_id, "Temperature").Select("Current_data").Scan(&temp).Error
	if err != nil {
		return 0, 0, err
	}
	err = userRepo.db.Table("Iot_device").Where("House_id = ? and Device_type = ?", house_id, "Humidity").Select("Current_data").Scan(&humid).Error
	if err != nil {
		return 0, 0, err
	}
	return temp, humid, nil
}

//	type User struct {
//		ID       int    `gorm:"primaryKey;column:User_id" json:"user_id"`
//		Username string `gorm:"username" json:"username"`
//		Password string `gorm:"password" json:"password"`
//	}
//
// type Own struct { // More descriptive name
//
//		UserID  int `gorm:"primary_key;foreignKey:User_id"`
//		HouseID int `gorm:"primary_key;foreignKey:House_id"`
//	}
//
//	type House struct {
//		ID       int    `gorm:"primaryKey;column:House_id" json:"house_id"`
//		Name     string `gorm:"name" json:"name"`
//		Password string `gorm:"password" json:"password"`
//	}

func (userRepo *userRepository) GetHouseID(userID int) ([]int, error) {
	var houseIDs []int
	err := userRepo.db.Table("Own").Where("User_id = ?", userID).Select("House_id").Scan(&houseIDs).Error
	if err != nil {
		return nil, err
	}
	return houseIDs, nil
}
