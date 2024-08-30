# Whiteboard Drawing App

This Whiteboard Drawing App is a collaborative drawing tool that allows users to create a shared canvas. Users can create a room, which others can join to see and contribute to the drawing in real-time. The app uses sockets to provide real-time updates to the canvas, ensuring that all participants see the same drawing as it evolves.

## Key Features

- Real-Time Collaboration: Sockets ensure real-time updates to the drawing canvas, so all participants can see changes instantly.

- Room Creation: Users can create a unique room that others can join by entering the room ID.

- Undo & Redo: Supports undo and redo operations, allowing users to correct mistakes or revisit previous states of the drawing.

- Customizable Tools: Users can choose from a variety of tools, including different pen colors, shapes, lines, and more.

- Responsive UI: The user interface is responsive and adapts to different screen sizes, providing a seamless experience across devices.

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/yashwardhan-jyani/Whiteboard.git
    ```

2. Navigate to the project directory:
    ```
    cd Whiteboard
    ```

3. Install the frontend dependencies:
    ```
    cd frontend
    npm install
    ```

4. Install the backend dependencies:
    ```
    cd ../backend
    npm install
    ```

5. Run the backend server:
    ```
    node server.js
    ```

6. Run the frontend application:
    ```
    cd ../client
    npm run dev
    ```

## Usage

1. Create a Room: Click on "Create Room" to generate a unique room ID.
2. Join a Room: Share the room ID with others or use it to join an existing room.
3. Start Drawing: Use the available tools to draw on the canvas. All changes are reflected in real-time for all participants in the room.
4. Undo/Redo: Use the undo and redo buttons to correct mistakes or revert to previous versions of the drawing.

## Technologies Used

- Frontend: React, Bootstrap
- Backend: Node.js, Express.js
- Real-Time Communication: Socket.io
- Version Control: Git, GitHub

## Preview

![Screenshot 2024-08-31 011506](https://github.com/user-attachments/assets/0fcef4e2-9f25-417e-bd90-e282030bd388)
![Screenshot 2024-08-31 011912](https://github.com/user-attachments/assets/66fba594-1c0e-46c0-96f1-e2ad76150cda)

