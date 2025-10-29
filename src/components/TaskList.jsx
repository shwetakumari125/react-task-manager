import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function DraggableTable({ headers, data, onDragEnd, renderActions }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tableRows">
          {(provided) => (
            <table
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="min-w-full text-left text-sm text-gray-700 border-collapse"
            >
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b w-6"></th>
                  {headers.map((header, i) => (
                    <th key={i} className="px-4 py-3 font-semibold border-b">
                      {header}
                    </th>
                  ))}
                  {renderActions && (
                    <th className="px-4 py-3 font-semibold border-b text-right">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={headers.length + (renderActions ? 2 : 1)}
                      className="text-center py-6 text-gray-500"
                    >
                      No records found
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <Draggable
                      key={row.id}
                      draggableId={String(row.id)}
                      index={index}
                    >
                      {(providedDraggable) => (
                        <tr
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          style={{
                            ...providedDraggable.draggableProps.style,
                            background: "white",
                          }}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-3 border-b text-gray-400 text-lg cursor-grab">
                            ⋮
                          </td>

                          {headers.map((header, i) => {
                            const key = header.toLowerCase();
                            return (
                              <td key={i} className="px-4 py-3 border-b">
                                {row[key] ?? "-"}
                              </td>
                            );
                          })}

                          {renderActions && (
                            <td className="px-4 py-3 border-b text-right">
                              {renderActions(row)}
                            </td>
                          )}
                        </tr>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
