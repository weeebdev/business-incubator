package main

import (
	"fmt"
	"log"

	_entryDelivery "bi-api/entry/delivery/http"
	_entryRepo "bi-api/entry/repository"
	_entryUcase "bi-api/entry/usecase"

	"github.com/gofiber/fiber/v2"
	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Config struct {
	DBUser     string `mapstructure:"POSTGRES_USER"`
	DBPassword string `mapstructure:"POSTGRES_PASSWORD"`
	DBName     string `mapstructure:"POSTGRES_DB"`
	DBHost     string `mapstructure:"POSTGRES_HOST"`
	DBPort     int    `mapstructure:"POSTGRES_PORT"`
	AppPort    int    `mapstructure:"APP_PORT"`
	FEED       bool   `mapstructure:"FEED"`
}

func init() {
	viper.SetConfigFile("dev.env")
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		return
	}
}

func main() {
	var config Config
	if err := viper.Unmarshal(&config); err != nil {
		fmt.Printf("main: %s\n", err)
		return
	}

	DSN := fmt.Sprintf("postgres://%s:%s@%s:%d/%s", config.DBUser, config.DBPassword, config.DBHost, config.DBPort, config.DBName)
	db, err := gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if err != nil {
		fmt.Printf("main: %s\n", err)
		return
	}

	app := fiber.New()

	entryRepo := _entryRepo.NewPsqlEntryRepository(db)

	eUsecase := _entryUcase.NewEntryUsecase(entryRepo)

	_entryDelivery.NewEntryHandler(app, eUsecase)

	log.Fatal(app.Listen(fmt.Sprintf(":%d", config.AppPort)))
}
