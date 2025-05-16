-- Insertar roles
INSERT INTO ROL (ROL) VALUES 
('Administrador'),
('Estudiante');

-- Insertar usuarios
INSERT INTO USUARIO (COD_ROL, NOMBRE, USUARIO, PASSWORD, EMAIL) VALUES
(1, 'Juan Pérez', 'juanp', 'clave123', 'juan@example.com'),
(2, 'Ana Gómez', 'anag', 'clave456', 'ana@example.com');

-- Insertar cursos
INSERT INTO CURSO (TITULO_CURSO, DESCRIPCION_CURSO) VALUES
('Curso de Introducción a la Programación', 'Aprende los fundamentos de la programación.'),
('Curso de Bases de Datos', 'Aprende sobre diseño y uso de bases de datos.');

-- Insertar usuario_curso (asignar usuarios a cursos)
INSERT INTO USUARIO_CURSO (COD_CURSO, COD_USUARIO) VALUES
(1, 1),
(1, 2),
(2, 2);

-- Insertar módulos
INSERT INTO MODULO (COD_CURSO, TITULO_MODULO, DESCRIPCION_MODULO) VALUES
(1, 'Módulo 1: Fundamentos', 'Conceptos básicos de programación.'),
(2, 'Módulo 1: SQL', 'Introducción a SQL.');

-- Insertar secciones
INSERT INTO SECCION (COD_MODULO, TITULO_SECCION, DESCRIPCION_SECCION) VALUES
(1, 'Sección 1.1: Variables', 'Tipos de datos y variables.'),
(2, 'Sección 2.1: SELECT', 'Consultas básicas con SELECT.');

-- Insertar subsecciones
INSERT INTO SUBSECCION (COD_MODULO, COD_SECCION, TITULO_SUBSECCION, DESCRIPCION_SUBSECCION) VALUES
(1, 1, 'Subsección 1.1.1: Enteros', 'Uso de números enteros.'),
(2, 1, 'Subsección 2.1.1: SELECT *', 'Uso de SELECT *.');

-- Insertar contenido
INSERT INTO CONTENIDO (COD_MODULO, COD_SECCION, COD_SUBSECCION, IMAGEN, DESCRIPCION, LINK) VALUES
(1, 1, 1, null, 'Introducción al curso', 'https://www.youtube.com/watch?v=CjmzDHMHxwU'),
(2, 1, 1, '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', null, null);

-- Insertar evaluaciones
INSERT INTO EVALUACION (COD_MODULO, COD_SECCION) VALUES
(1, 1),
(2, 1);

-- Insertar problemas
INSERT INTO PROBLEMA (COD_EVALUACION, COD_MODULO, COD_SECCION, COD_SUBSECCION, TITULO_PROBLEMA, DESCRIPCION_PROBLEMA, INPUT, OUTPUT) VALUES
(1, 1, 1, 1, 'Suma de enteros', 'Sumar dos números enteros', '2 3', '5'),
(2, 2, 1, 1, 'Consulta básica', 'Seleccionar todos los registros de una tabla', 'SELECT * FROM alumnos;', 'resultado');

-- Insertar ejemplos
INSERT INTO EJEMPLOS (COD_PROBLEMA, INPUT_EJEMPLO, OUPUT_EJEMPLO) VALUES
(1, '2 3', '5'),
(2, 'SELECT * FROM alumnos;', 'resultado');

-- Insertar progreso
INSERT INTO PROGRESO (COD_CURSO, COD_USUARIO, COD_MODULO, COD_SECCION, TOTAL, TOTAL_TERMINADO) VALUES
(1, 1, 1, 1, 5, 2),
(2, 2, 2, 1, 4, 4);

-- Insertar notas
INSERT INTO NOTA (COD_PROBLEMA, COD_USUARIO, NOTA, NOTA_TOTAL) VALUES
(1, 1, 4, 5),
(2, 2, 5, 5);
