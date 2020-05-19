import { uuid } from "./utils";

export default {
  name: "workshop",
  columns: [
    {
      name: "todo",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null,
          status: false,
        },
        {
          description: "",
          name: "second task",
          id: uuid(),
          userAssigned: null,
          status: false,
        },
        {
          description: "",
          name: "and thrid",
          id: uuid(),
          userAssigned: null,
          status: false,
        },
      ],
    },
    {
      name: "in-progress",
      tasks: [
        {
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          name: "first task",
          id: uuid(),
          userAssigned: null,
          status: false,
        },
      ],
    },
    {
      name: "done",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null,
          status: false,
        },
      ],
    },
  ],
};
