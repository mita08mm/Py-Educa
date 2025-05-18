import io

def test_obtener_contenido(client):
    response = client.get('/contenido?cod_subseccion=1')
    assert response.status_code in (200, 404)  # espera 200 o 404 si no hay datos aún

def test_obtener_contenido_sin_datos(client):
    response = client.get('/contenido/999')  
    assert response.status_code == 200
    assert response.get_json() == []
    
def test_obtener_contenido_cod_subseccion_invalido(client):
    response = client.get('/contenido/abc')  # 'abc' no es int
    assert response.status_code == 404

def test_agregar_contenido_exitoso(client):
    data = {
        "cod_modulo": 1,
        "cod_seccion": 1,
        "descripcion": "Contenido de prueba",
        "link": "https://example.com",
        "imagen": (io.BytesIO(b"fake-image-bytes"), "imagen.jpg")
    }

    response = client.post(
        "/contenido/1",  # cod_subseccion=1
        data=data,
        content_type="multipart/form-data"
    )

    assert response.status_code == 201
    json_data = response.get_json()

    assert json_data["cod_modulo"] == 1
    assert json_data["cod_seccion"] == 1
    assert json_data["cod_subseccion"] == 1
    assert json_data["descripcion"] == "Contenido de prueba"
    assert json_data["link"] == "https://example.com"

def test_agregar_contenido_faltan_campos(client):
    data = {
        "descripcion": "Contenido sin módulo",
        "link": "https://example.com"
        # Falta cod_modulo y cod_seccion
    }

    response = client.post(
        "/contenido/1",
        data=data,
        content_type="multipart/form-data"
    )

    assert response.status_code == 400
    assert response.get_json()["error"] == "cod_modulo y cod_seccion son requeridos"
