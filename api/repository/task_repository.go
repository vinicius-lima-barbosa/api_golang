package repository

import "api_test/model"

var tasks []model.Task
var ids int

func GetAll() []model.Task {
	return tasks
}

func GetById(id int) (model.Task, bool) {
	for _, task := range tasks {
		if task.ID == id {
			return task, true
		}
	}

	return model.Task{}, false
}

func Create(task model.Task) model.Task {
	task.ID = ids + 1
	tasks = append(tasks, task)

	ids = ids + 1
	return task
}

func Edit(newTask model.Task, id int) bool {
	for i, task := range tasks {
		if task.ID == id {
			tasks[i] = newTask
			return true
		}
	}

	return false
}

func Update(newTask model.Task, id int) (model.Task, bool) {
	for i, task := range tasks {
		if task.ID == id {
			if newTask.Title != "" {
				tasks[i].Title = newTask.Title
			}

			if newTask.Description != "" {
				tasks[i].Description = newTask.Description
			}

			if newTask.IsCompleted != tasks[i].IsCompleted {
				tasks[i].IsCompleted = newTask.IsCompleted
			}

			return tasks[i], true
		}
	}

	return model.Task{}, false
}

func Delete(id int) bool {
	for i, task := range tasks {
		if task.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			return true
		}
	}

	return false
}
