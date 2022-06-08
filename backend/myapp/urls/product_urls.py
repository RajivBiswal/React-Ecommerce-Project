from django.urls import path
from myapp.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name='products'),
    path('create/', views.createProduct, name='product-create'),
    path('upload/', views.uploadImage, name='image-upload'),

    path('<str:pk>/reviews/', views.createProductReview, name='product-review'),
    path('feature/', views.getFeatureProducts, name='feature'),
    path('<str:pk>/', views.getProduct, name='product'),

    path('delete/<str:pk>/', views.deleteProduct, name='product-delete'),
    path('update/<str:pk>/', views.updateProduct, name='product-update'),
]