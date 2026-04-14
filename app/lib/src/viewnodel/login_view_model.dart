import 'package:app_petamigo/src/models/user_model.dart';
import 'package:app_petamigo/src/services/auth_service.dart';
import 'package:flutter/material.dart';

class LoginViewModel extends ChangeNotifier {
  final AuthService _authService = AuthService();
  bool isLoading = false;
  String? erroMessage;

  Future<UserModel?> login(String email, String password) async {
    isLoading = true;
    erroMessage = null;
    notifyListeners();
    try {
      final reponse = await _authService.login(email, password);
      final user = UserModel.fromJson(reponse);
      return user;
    } catch (e) {
      erroMessage = e.toString().replaceAll('Exeception: ', '');
      return null;
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}
