package driver

import (
	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"
)

// SqlServerDB is a struct as Singleton to hold the connection of sql server on Azure Cloud
type SqlServerDB struct {
	DB *gorm.DB
}

var SqlServer = &SqlServerDB{}

func ConnectSqlServerDB() *SqlServerDB {

	db, err := gorm.Open(sqlserver.Open("sqlserver connection string"), &gorm.Config{})

	if err != nil {
		panic(err)

	}

	SqlServer.DB = db
	return SqlServer
}

// close function for the only instance of SqlServerDB
func CloseSqlServerDB() {
	db, err := SqlServer.DB.DB()
	if err != nil {
		panic(err)
	}
	db.Close()
}
