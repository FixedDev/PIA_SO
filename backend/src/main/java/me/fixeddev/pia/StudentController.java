package me.fixeddev.pia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")

public class StudentController {

    @Autowired
    private StudentRepository repository;

    @GetMapping
    public Iterable<Student> obtenerTodos() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> saveStudent(@RequestBody Student student) {
        try {
            Student savedStudent = repository.save(student);
            return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al guardar: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        repository.deleteById(id);
    }
}