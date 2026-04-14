import 'dart:convert';

import 'package:http/http.dart' as http;

class AuthService {
  final String baseUrl = "http://10.0.2.2:4040";

  Future<Map<String, dynamic>> login(String email, String password) async {
    final reponse = await http.post(
      Uri.parse('$baseUrl/users/login'),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"email": email, "password": password}),
    );

    final data = jsonDecode(reponse.body);
    if (reponse.statusCode == 200) {
      return data;
    } else {
      throw Exception(data['message'] ?? 'Email ou Senha inválidos');
    }
  }
}
