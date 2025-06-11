import pytest

# Test: crear curso exitosamente
def test_crear_curso_exitoso(client):
    data = {
        "titulo_curso": "Curso de Flask",
        "descripcion_curso": "Curso práctico con Flask"
    }

    response = client.post("/api/cursos", json=data)
    assert response.status_code == 201

    json_data = response.get_json()
    assert isinstance(json_data["cod_curso"], int)
    assert json_data["titulo_curso"] == data["titulo_curso"]
    assert json_data["descripcion_curso"] == data["descripcion_curso"]


# Test: error por datos inválidos (falta titulo)
def test_crear_curso_sin_titulo(client):
    data = {
        "descripcion_curso": "Este curso no tiene título"
    }

    response = client.post("/api/cursos", json=data)
    assert response.status_code == 400

    json_data = response.get_json()
    assert "titulo_curso" in json_data  # marshmallow devuelve errores por campo


# Test: obtener lista de cursos
def test_listar_cursos(client):
    # Se asume que ya hay al menos un curso en la base de datos
    response = client.get("/api/cursos")
    assert response.status_code == 200

    json_data = response.get_json()
    assert isinstance(json_data, list)

    if json_data:  # si hay cursos
        for curso in json_data:
            assert "cod_curso" in curso
            assert "titulo_curso" in curso
            assert isinstance(curso["cod_curso"], int)
