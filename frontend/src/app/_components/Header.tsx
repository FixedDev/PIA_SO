"use client"

export default function Header({}) {
    return (
        <header className="header">
            <h1>Gestión Escolar</h1>
            <p>Sistema de control de calificaciones</p>
            <p id={"error-global"} style={{color: "red", textDecoration: "bold"}}></p>
        </header>
    )
}