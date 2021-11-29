package http

import (
	"bi-api/domain"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type EntryHandler struct {
	entryUsecase domain.EntryUsecase
}

func NewEntryHandler(app *fiber.App, entryUsecase domain.EntryUsecase) {
	handler := &EntryHandler{
		entryUsecase: entryUsecase,
	}

	app.Get("/entries", handler.GetAll)
	app.Get("/entries/:id", handler.GetByID)
	app.Post("/entries", handler.Create)
	app.Put("/entries/:id", handler.Update)
	app.Delete("/entries/:id", handler.Delete)
}

func (h *EntryHandler) GetAll(c *fiber.Ctx) error {
	entries, err := h.entryUsecase.GetAll()
	if err != nil {
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(entries)
}

func (h *EntryHandler) GetByID(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	id64 := int64(id)

	entry, err := h.entryUsecase.GetByID(id64)
	if err != nil {
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(entry)
}

func (h *EntryHandler) Create(c *fiber.Ctx) error {
	var entry domain.Entry
	if err := c.BodyParser(&entry); err != nil {
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	entry, err := h.entryUsecase.Create(entry)
	if err != nil {
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(entry)
}

func (h *EntryHandler) Update(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	id64 := int64(id)

	entry := domain.Entry{
		ID: id64,
	}
	if err := c.BodyParser(&entry); err != nil {
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	entry, err = h.entryUsecase.Update(entry)
	if err != nil {
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(entry)
}

func (h *EntryHandler) Delete(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	id64 := int64(id)

	if err := h.entryUsecase.Delete(id64); err != nil {
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
