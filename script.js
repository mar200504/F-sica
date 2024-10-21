//console.log("holi")

const CANVAS = document.getElementById("canvas");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

function updateCanvasSize() {
  CANVAS.width = CANVAS.getBoundingClientRect().width;
  CANVAS.height = CANVAS.getBoundingClientRect().height;
}

//script
const { Engine, Render, World, Bodies, Body, Runner } = Matter;

//crear un engine 
const engine = Engine.create();
const world = engine.world;

// Create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    canvas: document.getElementById('canvas'),
    options: {
        wireframes: false
    }
})

// Create walls
const walls = [
    Bodies.rectangle(0, 300, 96, 600, { isStatic: true }), // Left wall
    Bodies.rectangle(800, 300, 50, 600, { isStatic: true }) // Right wall
];

// Create maze walls
const mazeWalls = [
    //Bodies. rectangle pos en x, pos en y,largo, ancho { isStatic: define si le afecta la gravedad}
    Bodies.rectangle(425, 90, 50, 20, { isStatic: true }), // 1
    Bodies.rectangle(250, 160, 150, 20, { isStatic: true }), //1.1
    Bodies.rectangle(340, 250, 150, 20, { isStatic: true }), // 2
    Bodies.rectangle(420, 250, 15, 300, { isStatic: true }), // 2.1
    Bodies.rectangle(150, 250, 40, 50, { isStatic: true }), // 2.2
    Bodies.rectangle(150, 350, 200, 20, { isStatic: true }), // 3
    Bodies.rectangle(320, 400, 20, 175, { isStatic: true }), // 3.1
    Bodies.rectangle(288, 462, 40, 50, { isStatic: true }), // 3.2
    Bodies.rectangle(350, 500, 400, 20, { isStatic: true }),  // 4
    Bodies.rectangle(65, 575, 30, 40, { isStatic: true }), // 4.1
    Bodies.rectangle(250, 600, 400, 20, { isStatic: true })  // 5
];

// Create a ball
//const ball = Bodies.circle (pos en x, masa??, size)
const ball = Bodies.circle(400, 1000, 15, {
    restitution: 1.21 // Bounciness
});

// Add bodies to the world
World.add(world, [...walls, ...mazeWalls, ball]);

// Run the engine
Engine.run(engine);
Render.run(render);

// Update loop to check if the ball exits the canvas
const runner = Runner.create();
Runner.run(runner, engine);

Matter.Events.on(engine, 'afterUpdate', function() {
    if (ball.position.y > 600) {
        // Reset ball position if it goes off the canvas
        Body.setPosition(ball, { x: 400, y: 50 });
        Body.setVelocity(ball, { x: 0, y: 0 }); // Stop the ball
    }
});