import pytest

# Datos de prueba válidos
modulo_data = {
    "cod_modulo": 1,
    "cod_curso": 101,
    "titulo_modulo": "Introducción a Python",
    "descripcion_modulo": "Este módulo cubre los fundamentos del lenguaje Python."
}

def test_post_crear_modulo(client):
    response = client.post("/modulos/", json={"cod_curso": 101, "titulo_modulo": "Introducción a Python", "descripcion_modulo": "Este módulo cubre los fundamentos del lenguaje Python."})
    assert response.status_code == 201
    data = response.get_json()
    assert data["cod_modulo"] == modulo_data["cod_modulo"]
    assert data["titulo_modulo"] == modulo_data["titulo_modulo"]

def test_get_listar_modulos(client):
    response = client.get("/modulos/")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(modulo["cod_modulo"] == modulo_data["cod_modulo"] for modulo in data)
