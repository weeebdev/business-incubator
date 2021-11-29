package usecase

import (
	"bi-api/domain"
)

type entryUsecase struct {
	entryRepo domain.EntryRepository
}

func NewEntryUsecase(entryRepo domain.EntryRepository) domain.EntryUsecase {
	return &entryUsecase{
		entryRepo: entryRepo,
	}
}

func (e *entryUsecase) GetAll() ([]domain.Entry, error) {
	return e.entryRepo.GetAll()
}

func (e *entryUsecase) GetByID(id int64) (domain.Entry, error) {
	return e.entryRepo.GetByID(id)
}

func (e *entryUsecase) Create(entry domain.Entry) (domain.Entry, error) {
	return e.entryRepo.Create(entry)
}

func (e *entryUsecase) Update(entry domain.Entry) (domain.Entry, error) {
	return e.entryRepo.Update(entry)
}

func (e *entryUsecase) Delete(id int64) error {
	return e.entryRepo.Delete(id)
}
