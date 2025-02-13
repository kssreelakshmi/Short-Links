from django.urls import path
from . import views
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    
    # User
    path('routes', GetAccountRoutes.as_view(),name='account_routes'),
    path('token/', MyTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path("details/", views.UserDetails.as_view()),
    path('signup/', views.UserSignupView.as_view()),
    path('login/', views.UserLoginView.as_view()),
    path("details/update", views.UserDetailsUpdate.as_view()),

    # Admin
    path('admin/current/', views.AdminUserView.as_view()),
    path('admin/users/', views.AdminUserListCreateView.as_view()),
    path('admin/users/<int:id>/', views.AdminUserRetrieveView.as_view()),
    path('admin/users/update/<int:id>/', views.AdminUserUpdateView.as_view()),
    path('admin/users/image/update/<int:id>/', views.AdminUserImageUpdateView.as_view()),
    path('admin/users/delete/<int:id>/', views.AdminUserDeleteView.as_view()),
    path('admin/user/toggle-active/<int:user_id>/', views.ToggleUserActiveView.as_view()),

]