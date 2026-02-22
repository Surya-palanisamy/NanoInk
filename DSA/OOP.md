# Object-Oriented Programming (OOP)

**Object-Oriented Programming (OOP)** is a programming paradigm based on the concept of "objects". Objects can contain data (in the form of attributes or properties) and code (in the form of methods or functions).

## The 4 Pillars of OOP

## 1. Encapsulation

Encapsulation is the bundling of data (variables) and the methods that operate on that data into a single unit (a class). It also involves restricting direct access to some of the object's components to prevent accidental interference or misuse.

- **Concept:** Information hiding (Security).
- **Example:** A `BankAccount` class where the `balance` is private, and can only be updated through secure `deposit()` or `withdraw()` methods.

```java
// Encapsulation Example
class BankAccount {
    // Private data - completely hidden from the outside world
    private double balance = 0.0;

    // Public method to safely add money
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount; // Safe internal update
        }
    }

    // Public method to retrieve data safely without allowing direct edits
    public double getBalance() {
        return balance;
    }
}

// Usage:
// BankAccount myAccount = new BankAccount();
// myAccount.balance = 999999; // ERROR! Cannot directly access private data
// myAccount.deposit(100.0);   // ALLOWED! Safe interaction
```

**Simple Explanation:** The `balance` can't be changed arbitrarily. You MUST use `deposit()`, keeping the data safe and protected.

## 2. Abstraction

Abstraction means hiding complex implementation details and showing only the essential, relevant features of an object to the user.

- **Concept:** Hiding complex internal workings.
- **Example:** Pressing the accelerator pedal in a car. You don't need to understand how the fuel injection works; you just interact with the pedal to go.

```java
// Abstraction Example
abstract class Car {
    // We define what a car should do, but hide HOW it does it
    abstract void startEngine();

    public void pressAccelerator() {
        System.out.println("Car is moving forward...");
    }
}

class SportsCar extends Car {
    // The complex hidden details are purely handled inside the specific car
    void startEngine() {
        System.out.println("V8 Engine roaring to life with spark plugs firing!");
    }
}

// Usage:
// Car myCar = new SportsCar();
// myCar.startEngine();  It just works! You don't need to know the complex details inside.
```

**Simple Explanation:** You interact with the `Car` easily. The difficult, complex details of how `startEngine()` works are hidden safely inside the specific `SportsCar`.

## 3. Inheritance

Inheritance allows a new class (child class) to derive properties and behaviors from an existing class (parent class).

- **Concept:** Code reusability and hierarchy.
- **Example:** A `Dog` and `Cat` returning shared behaviors from an `Animal` parent class.

```java
// Inheritance Example
class Animal {
    String name;

    public void eat() {
        System.out.println(name + " is eating.");
    }
}

// Dog "inherits" (borrows) the name variable and eat() method from Animal
class Dog extends Animal {
    public void bark() {
        System.out.println(name + " says Woof!");
    }
}

// Usage:
// Dog d = new Dog();
// d.name = "Rex";
// d.eat();   // Inherited method from Animal! We didn't have to rewrite it.
// d.bark();  // Specific method only for Dog!
```

**Simple Explanation:** The `Dog` class automatically gets the `name` variable and `eat()` method from `Animal`. We saved time by not having to write them again!

## 4. Polymorphism

Polymorphism (meaning "many forms") allows objects of different classes to be treated as objects of a common superclass. The same action can behave differently depending on the specific object answering it.

- **Concept:** One action name, completely different unique behaviors.
- **Example:** A `makeSound()` method that behaves differently for a `Dog` compared to a `Cat`.

```java
// Polymorphism Example
class Animal {
    public void makeSound() {
        System.out.println("Some generic animal sound...");
    }
}

class Dog extends Animal {
    // We override (replace) the parent's default behavior
    public void makeSound() {
        System.out.println("Woof! Woof!");
    }
}

class Cat extends Animal {
    // We override (replace) the parent's default behavior differently
    public void makeSound() {
        System.out.println("Meow!");
    }
}

// Usage:
// Animal myDog = new Dog();
// Animal myCat = new Cat();
//
// myDog.makeSound(); // Outputs: Woof! Woof!
// myCat.makeSound(); // Outputs: Meow!
```

**Simple Explanation:** If you tell any `Animal` to `makeSound()`, it knows exactly what unique response to give. A `Dog` forms a bark, and a `Cat` forms a meow, even though they were both commanded using the exact same generic `makeSound()` name.

---

## 5. Constructor

A **constructor** is a special method used to initialize objects when they are created.

### Key Points:

- Same name as class
- No return type (not even `void`)
- Automatically called when object is created

```java
class Student {
    String name;

    // Constructor
    Student(String n) {
        name = n;
    }
}
```

---

## 6. Constructor Overloading

Multiple constructors with **different parameters**.

```java
class Box {
    int length, width;

    Box() {
        length = 0;
        width = 0;
    }

    Box(int l, int w) {
        length = l;
        width = w;
    }
}
```

---

## 7. Method Overloading (Compile-Time Polymorphism)

```java
class MathUtil {
    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}
```

---

## 8. Method Overriding (Run-Time Polymorphism)

```java
class Animal {
    void sound() {
        System.out.println("Animal makes sound");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Dog barks");
    }
}
```

---

## 9. this Keyword

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}
```

---

## 10. super Keyword

```java
class Animal {
    Animal() {
        System.out.println("Animal Constructor");
    }
}

class Dog extends Animal {
    Dog() {
        super();
        System.out.println("Dog Constructor");
    }
}
```

---

## 11. Static Keyword

```java
class Counter {
    static int count = 0;

    Counter() {
        count++;
    }
}
```

---

## 12. Final Keyword

```java
final class Constants {
    final double PI = 3.14;
}
```

---

## 13. Interface

```java
interface Vehicle {
    void start();
}

class Bike implements Vehicle {
    public void start() {
        System.out.println("Bike starts with kick");
    }
}
```

---

## 14. Abstract Class vs Interface

| Feature     | Abstract Class      | Interface      |
| ----------- | ------------------- | -------------- |
| Methods     | Abstract + Concrete | Only abstract  |
| Variables   | Allowed             | Constants only |
| Inheritance | Single              | Multiple       |

---

## 15. Association

- Aggregation (weak)
- Composition (strong)

---

## 16. Aggregation

```java
class Department {
    String deptName;
}

class Student {
    Department dept;
}
```

---

## 17. Composition

```java
class Engine {
    void start() {}
}

class Car {
    private Engine engine = new Engine();
}
```

---

## 18. Object Cloning

```java
class Student implements Cloneable {
    int id;

    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

---

## 19. Object Class

Methods:

- toString()
- equals()
- hashCode()

---

## 20. Wrapper Classes

| Primitive | Wrapper   |
| --------- | --------- |
| int       | Integer   |
| float     | Float     |
| char      | Character |

---

## 21. Access Modifiers

| Modifier  | Same Class | Same Package | Subclass | Other Package |
| --------- | ---------- | ------------ | -------- | ------------- |
| public    | Yes        | Yes          | Yes      | Yes           |
| protected | Yes        | Yes          | Yes      | No            |
| default   | Yes        | Yes          | No       | No            |
| private   | Yes        | No           | No       | No            |

---

## 22. Packages

```java
package com.myapp.util;
```

---

## 23. Exception Handling

```java
try {
    int x = 10 / 0;
} catch (Exception e) {
    System.out.println("Error handled");
}
```

---

## 24. Garbage Collection

```java
obj = null;
```

---

# Final Summary

OOP includes:

- Constructors
- Overloading & Overriding
- Interfaces & Abstract Classes
- HAS-A and IS-A relationships
- Memory management
- Access control
