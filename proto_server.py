from concurrent import futures

import grpc

from generated import example_pb2, example_pb2_grpc
from generated.example_pb2 import MessageResponse, Message


class MyService(example_pb2_grpc.UnaryServicer):

    def GetServerResponse(self, request, context):
        return MessageResponse(message=request.message, received=True)


if __name__ == '__main__':
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    example_pb2_grpc.add_UnaryServicer_to_server(MyService(), server)

    server.add_insecure_port('localhost:5000')
    server.start()
    server.wait_for_termination()
