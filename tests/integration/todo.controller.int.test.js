const request = require("supertest");
const app = require("../../app");
const endpointUrl = "/todos/";
const newTodo = require("../mock-data/new-todo.json")
let firstTodo,newTodoId;
const testData = {
    title: "This is the put test",
    done: true
}
const nonExixtingTodoId = "634e29a1f24e7d78b2d11bdf"
describe(endpointUrl,()=>{
    test("Get"+endpointUrl, async()=>{
        const response = await request(app).get(endpointUrl);
        
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        firstTodo = response.body[0]
    })

    test("Get by Id"+ endpointUrl +":todoId", async()=>{
        const response = await request(app).get(endpointUrl+firstTodo._id)
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);
    })
    it("POST"+endpointUrl,async ()=>{
        const response =  await request(app).post(endpointUrl).send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        newTodoId = response.body._id;
    })

    it("should return error 500 on malformed data with post"+ endpointUrl, async()=>{
        const response = await request(app).post(endpointUrl).send({title:"Missing done property"})
        expect(response.statusCode).toBe(500)
        expect(response.body).toStrictEqual({
            message:"Todo validation failed: done: Path `done` is required."
        })
    })

    it("PUT "+endpointUrl,async()=>{
        
        const res= await request(app).put(endpointUrl+newTodoId).send(testData);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(testData.title);
        expect(res.body.done).toBe(testData.done);
    })
    it("should returen 404 on PUT"+endpointUrl, async()=>{
        const res = await request(app).put(endpointUrl+nonExixtingTodoId).send(testData);
        expect(res.statusCode).toBe(404);
    })
    test("HTTP Delete"+endpointUrl, async()=>{
        const res = await request(app).delete(endpointUrl+newTodoId).send();
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(testData.title);
        expect(res.body.done).toBe(testData.done);
    });
    test("HTTP DELETE 404",async()=>{
        const res = await request(app).delete(endpointUrl+nonExixtingTodoId).send();
        expect(res.statusCode).toBe(404);
    })
    
})