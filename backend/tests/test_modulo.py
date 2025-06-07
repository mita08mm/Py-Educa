import pytest

def test_post_crear_modulo(client):
    new_module_data = {
        "cod_curso": 101,
        "titulo_modulo": "Introducción a Python",
        "descripcion_modulo": "Este módulo cubre los fundamentos del lenguaje Python."
    }
    
    response = client.post("/api/modulos/", json=new_module_data)
    assert response.status_code == 201
    data = response.get_json()
    
    assert isinstance(data["cod_modulo"], int) 
    assert data["cod_curso"] == new_module_data["cod_curso"]
    assert data["titulo_modulo"] == new_module_data["titulo_modulo"]
    assert data["descripcion_modulo"] == new_module_data["descripcion_modulo"]

def test_get_listar_modulos(client):
    response = client.get("/api/modulos/")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)

    assert len(data) > 0
    assert all(isinstance(modulo["cod_modulo"], int) for modulo in data)
    assert all("titulo_modulo" in modulo for modulo in data)
