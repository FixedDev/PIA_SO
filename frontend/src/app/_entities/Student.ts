export class Student {
    id: number;
    name: string;
    rollNumber: string;
    grade: number;

    constructor(id: number, name: string, rollNumber: string,grade: number) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.rollNumber = rollNumber;
    }
}