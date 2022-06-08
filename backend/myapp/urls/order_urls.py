from django.urls import path
from myapp.views import order_views as views


urlpatterns = [
    path('', views.getOrderList, name='orders'),
    path('add/', views.addOrderItems, name='order_add'),
    path('myorders/', views.getMyOrder, name='myorders'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
    path('<str:pk>/packed/', views.updateOrderToPacked, name='packed'),
    path('<str:pk>/shipped/', views.updateOrderToShipped, name='shipped'),
    path('<str:pk>/delivered/', views.updateOrderToDelivered, name='delivered'),
]