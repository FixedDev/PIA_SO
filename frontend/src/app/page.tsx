"use client"

import {useEffect, useState} from "react";
import {Student} from "@/app/_entities/Student";
import {StudentsCards} from "@/app/_components/Cards";

export default function Home() {
    const [students, setStudents] = useState<Student[]>([]);

    const fetchStudents = async () => {
        const p = document.querySelector("#error-global");

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/students");
            const jsonData = await response.json();

            if (p !== null) {
                p.textContent = "";
            }

            if (!response.ok && p !== null) {
                p.textContent = "Se perdio la conexión con el servidor.";
            }

            const actualStudents = jsonData.map((s: any) =>
                new Student(s.id, s.name, s.rollNumber, s.grade)
            );
            setStudents(actualStudents);
        } catch (error) {
            if (p !== null) {
                p.textContent = "No pudimos establecer una conexión con el servidor, intentelo más tarde.";
            }
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const p = document.querySelector("#form-error");

        if (p !== null) {
            p.textContent = "";
        }

        const form = event.currentTarget;
        const formData = new FormData(form);

        const newStudent = {
            name: formData.get("name"),
            rollNumber: formData.get("rollNumber"),
            grade: formData.get("grade")
        };

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/students", {
                method: "POST",
                body: JSON.stringify(newStudent),
                headers: {"Content-Type": "application/json"}
            });

            if (response.ok) {
                fetchStudents();
                form.reset();
            } else {
                if (p !== null) {
                    p.textContent = "Ocurrió un error al procesar el usuario. ";
                }
            }
        } catch (error) {
            if (p !== null) {
                p.textContent = "Ocurrió un error al procesar el usuario: " + error;
            }
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/${id}`, {
                method: "DELETE"
            });
            setStudents(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error("Error eliminando:", error);
        }
    };

    return (
        <div className="content-grid">
            <div className="card form-section">
                <h3>Registrar Estudiante</h3>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Nombre Completo</label>
                        <input required type="text" placeholder="Ej. Juan Pérez" name="name"/>
                    </div>

                    <div className="form-group">
                        <label>Matrícula</label>
                        <input required type="text" placeholder="Ej. 1845678" name="rollNumber"/>
                    </div>

                    <div className="form-group">
                        <label>Calificación Final</label>
                        <input required type="number" min="0" max="100" placeholder="0 - 100" name="grade"/>
                    </div>

                    <p style={{color: "red", textDecoration: "bold"}} id={"form-error"}></p>

                    <button type="submit" className="btn-primary">Guardar Estudiante</button>
                </form>
            </div>

            <div className="results-section">
                <h3>Listado de Alumnos</h3>
                <StudentsCards students={students} onDelete={handleDelete}/>
            </div>
        </div>
    );
}