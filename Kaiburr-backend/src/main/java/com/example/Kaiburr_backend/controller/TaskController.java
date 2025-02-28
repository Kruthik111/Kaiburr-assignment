package com.example.Kaiburr_backend.controller;

import com.example.Kaiburr_backend.model.Task;
import com.example.Kaiburr_backend.model.Task.TaskExecution;
import com.example.Kaiburr_backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;


//@CrossOrigin(origins = "http://localhost:5173",allowedHeaders = "*")

@RestController
@CrossOrigin(origins = "http://localhost:5173",allowedHeaders = "*")
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        System.out.println("requested");
        return ResponseEntity.ok(taskRepository.save(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Task>> findTasksByName(@RequestParam String name) {
        List<Task> tasks = taskRepository.findAll().stream()
                .filter(task -> task.getName().contains(name))
                .toList();
        return tasks.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}/execute")
    public ResponseEntity<TaskExecution> executeTask(@PathVariable String id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Task task = taskOptional.get();
        TaskExecution execution = new TaskExecution();
        execution.setStartTime(new Date());

        // Simulating task execution with a delay
        CompletableFuture.runAsync(() -> {
            try {
                Thread.sleep(2000); // Simulated delay of 2 seconds
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            execution.setEndTime(new Date());
            execution.setOutput("Task executed successfully.");
            task.getTaskExecutions().add(execution);
            taskRepository.save(task);
        });

        return ResponseEntity.ok(execution);
    }
}