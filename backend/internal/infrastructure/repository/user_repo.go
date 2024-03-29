package repository

import (
	"context"
	entity "go-jwt/internal/entity"

	"gorm.io/gorm"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user *entity.User) (*entity.User, error)
	GetUserByID(ctx context.Context, id string) (*entity.User, error)
	GetUserByUsername(ctx context.Context, username string) (*entity.User, error)
	UpdateUser(ctx context.Context, id string, data *entity.User) (*entity.User, error)
	DeleteUser(ctx context.Context, id string) error
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) UserRepository {
	return &userRepository{
		db: db,
	}
}

func (userRepo *userRepository) CreateUser(ctx context.Context, user *entity.User) (*entity.User, error) {
	// err := userRepo.db.Create(user).Error
	// if err != nil {
	// 	return nil, err
	// }
	// return user, nil
	return nil, nil
}

func (userRepo *userRepository) GetUserByID(ctx context.Context, id string) (*entity.User, error) {
	// user := entity.User{}
	// err := userRepo.db.Where("id = ?", id).First(&user).Error
	// if err != nil {
	// 	return nil, err
	// }
	// return &user, nil
	return nil, nil
}

func (userRepo *userRepository) GetUserByUsername(ctx context.Context, username string) (*entity.User, error) {
	// user := entity.User{}
	// err := userRepo.db.Where("username = ?", username).First(&user).Error
	// if err != nil {
	// 	return nil, err
	// }
	// return &user, nil
	return nil, nil

}

func (userRepo *userRepository) UpdateUser(ctx context.Context, id string, data *entity.User) (*entity.User, error) {
	// err := userRepo.db.Model(&entity.User{}).Where("id = ?", id).Updates(data).Error
	// if err != nil {
	// 	return nil, err
	// }
	// return data, nil
	return nil, nil
}

func (userRepo *userRepository) DeleteUser(ctx context.Context, id string) error {
	// err := userRepo.db.Where("id = ?", id).Delete(&entity.User{}).Error
	// if err != nil {
	// 	return err
	// }
	// return nil
	return nil
}
