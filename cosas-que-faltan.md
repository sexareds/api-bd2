# Cosas que faltan por implementar

1. Llenar la BD porque no tiene nada xd

2. Terminar de implementar la paginación al resto de modelos. (lo tengo que terminar si).

3. Implementar un nuevo endpoint para cada entidad que permita buscar un elemento por su id.

3. Finalizar la implementación de los endpoints bajo tokens.

## A partir de aquí está en el Notion mejor explicado

4. Obtener el cromo diario de cada usuario.

5. Plantilla de jugadores: visualiza los jugadores que un usuario tenga en la plantilla, indicando si está en la banca o en la alineación con un booleano (isInLineup). Eso lo pusieron los de IDS, imagino que se debería crear una nueva entidad en la BD para guardar esa información.

```GET /public-events/<event-id>/squad```

```GET /public-events/<event-id>/squadAll```

6. Implementar el dinero y distintos fantasies. Se debería crear unas nueva tabla en la BD, debería guardar:
    - fantasy_id
    - user_id
    - event_id
    - points
    - money
    - created_at
    - updated_at

Además, debe tener sus distintos endpoints:
   
```GET /public-events/```: Me permite como jugador ver en que eventos puedo participar

```GET /public-events/<event-id>```: Visualiza en general, datos de su participacion en X evento de fantasy

```POST /public-events/<event-id>/join-game```: Entra a jugar en un evento FANTASY en especifico.

7. La parte de Semana 13 XD
