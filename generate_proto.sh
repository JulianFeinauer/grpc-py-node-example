(cd generated && rm *.py)
python -m grpc_tools.protoc --proto_path=proto example.proto --python_out=generated/ --grpc_python_out=generated/
cd generated && sed -i '' 's/^\(import.*pb2\)/from . \1/g' *.py && touch __init__.py