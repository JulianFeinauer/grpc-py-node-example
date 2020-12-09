import grpc

from generated import example_pb2_grpc
from generated.example_pb2 import Message

if __name__ == '__main__':
    with grpc.insecure_channel('localhost:5000') as channel:
        stub = example_pb2_grpc.UnaryStub(channel)
        response = stub.GetServerResponse(Message(message="Hallo what goes!"))
        print(response)