"use client"

import { Student } from "@/app/_entities/Student";

interface CardProps {
    student: Student;
    onDelete: (id: number) => void;
}

interface Props {
    students: Student[];
    onDelete: (id: number) => void;
}

export function Card({ student, onDelete }: CardProps) {
    let cardNames: string = "student-card";

    if (student.grade >= 70) {
        cardNames += " card-pass";
    } else {
        cardNames += " card-fail";
    }

    return (
        <div className={cardNames}>
            <div className={"card-header"}>
                <h4>{student.name}</h4>
                <span className={"matricula"}>#{student.rollNumber}</span>
            </div>
            <div className={"card-body"}>
                <p className={"grade-label"}>Calificación</p>
                <div className={"grade-value"}>{student.grade}</div>
            </div>
            <div className={"card-footer"}>
                <button
                    className={"btn-delete"}
                    onClick={() => onDelete(student.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}
export function StudentsCards({ students, onDelete }: Props) {
    return (
        <div className="cards-grid">
            {students.map(student => (
                <Card
                    student={student}
                    key={student.id}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}