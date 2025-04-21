from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'POST'])
def test_connectivity(request):
    if request.method == 'POST':
        data = request.data
        return Response({
            "message": "POST request received successfully!",
            "received_data": data
        }, status=status.HTTP_200_OK)
    return Response({
        "message": "GET request received — the endpoint is working!"
    })
