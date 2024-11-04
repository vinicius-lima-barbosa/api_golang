package service

import (
	"api_test/model"
	"api_test/repository"
	"errors"
)

func GetAllTasks() []model.Task {
	return repository.GetAll()
}

func GetTaskById(id int) (model.Task, error) {
	task, success := repository.GetById(id)
	if !success {
		return model.Task{}, errors.New("task not found")
	}

	return task, nil
}

func CreateTask(task model.Task) (model.Task, error) {
	if task.Title == "" || task.Description == "" {
		return model.Task{}, errors.New("title and description are required")
	}

	return repository.Create(task), nil
}

func EditTask(task model.Task, id int) (model.Task, error) {
	if task.Title == "" || task.Description == "" {
		return model.Task{}, errors.New("title and description are required")
	}

	if task.IsCompleted {
		return model.Task{}, errors.New("isCompleted should be false to edit the task")
	}

	response := repository.Edit(task, id)

	if !response {
		return model.Task{}, errors.New("task not found")
	}

	return task, nil
}

func UpdateTask(task model.Task, id int) (model.Task, error) {
	updatedTask, success := repository.Update(task, id)
	if !success {
		return model.Task{}, errors.New("task not found")
	}

	return updatedTask, nil
}

func DeleteTask(id int) error {
	response := repository.Delete(id)

	if !response {
		return errors.New("task not found")
	}

	return nil
}
