# def test_crear_evaluacion_exitosa(app,client):
#     data = {
#         "cod_modulo": 1,
#         "titulo_seccion": "Evaluacion 1. Funciones básicas",
#         "descripcion_seccion": "Resuelve la Evaluacion de Contenidos introductorios de funciones"
#     }

#     response = client.post("/api/evaluacion/", json=data)
#     assert response.status_code == 201

#     json_data = response.get_json()
#     assert json_data["cod_modulo"] == 1
#     assert json_data["titulo_seccion"] == "Evaluacion 1. Funciones básicas"
#     assert json_data["descripcion_seccion"] == "Resuelve la Evaluacion de Contenidos introductorios de funciones"
#     assert "cod_evaluacion" in json_data and isinstance(json_data["cod_evaluacion"], int)

def test_crear_evaluacion_falta_cod_modulo(client):
    data = {
        "titulo_seccion": "Evaluacion sin módulo",
        "descripcion_seccion": "Debe fallar"
    }

    response = client.post("/api/evaluacion/", json=data)
    assert response.status_code == 400
    assert "error" in response.get_json()

def test_crear_evaluacion_falta_titulo(client):
    data = {
        "cod_modulo": 5,
        "descripcion_seccion": "Falta título"
    }

    response = client.post("/api/evaluacion/", json=data)
    assert response.status_code == 400
    assert "error" in response.get_json()

def test_crear_evaluacion_json_vacio(client):
    response = client.post("/api/evaluacion/", json={})
    assert response.status_code == 400
    assert "error" in response.get_json()

def test_crear_evaluacion_sin_json(client):
    response = client.post("/api/evaluacion/", data="texto plano")
    assert response.status_code == 400 or response.status_code == 415 
