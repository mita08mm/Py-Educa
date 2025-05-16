def test_obtener_contenido(client):
    response = client.get('/contenido?cod_subseccion=1')
    assert response.status_code in (200, 404)  # espera 200 o 404 si no hay datos aún
    
