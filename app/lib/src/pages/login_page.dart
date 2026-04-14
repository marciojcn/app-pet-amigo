import 'package:app_petamigo/src/theme/app_colors.dart';
import 'package:app_petamigo/src/theme/app_text_styles.dart';
import 'package:app_petamigo/src/viewnodel/login_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:validatorless/validatorless.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final keyForm = GlobalKey<FormState>();

  void _login() async {
    if (!(keyForm.currentState?.validate() ?? false)) return;

    final viewModel = context.read<LoginViewModel>();

    final user = await viewModel.login(
      emailController.text,
      passwordController.text,
    );
    if (user != null && mounted) {
      Navigator.of(context).pushNamed('/home');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Login realizado com sucesso!!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final viewModel = context.watch<LoginViewModel>();
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AppColors.secondary, AppColors.accent, AppColors.primary],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(height: 40),
                Image.asset(
                  "assets/images/logo_mobile_petamigo.png",
                  width: 250,
                  height: 250,
                ),
                Form(
                  key: keyForm,
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 24),
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: AppColors.backgroundSoft,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Column(
                      children: [
                        TextFormField(
                          controller: emailController,
                          validator: Validatorless.multiple([
                            Validatorless.required('Campo Obrigatório'),
                            Validatorless.email('E-mail inválido!'),
                          ]),
                          decoration: const InputDecoration(
                            prefixIcon: Icon(Icons.email),
                            hintText: "E-mail",
                          ),
                        ),
                        const SizedBox(height: 16),
                        TextFormField(
                          controller: passwordController,
                          validator: Validatorless.required(
                            'Campo Obrigatório',
                          ),
                          obscureText: true,
                          decoration: const InputDecoration(
                            prefixIcon: Icon(Icons.lock),
                            hintText: "Senha",
                          ),
                        ),
                        const SizedBox(height: 10),
                        //Esqueceu senha
                        Align(
                          alignment: Alignment.centerRight,
                          child: TextButton(
                            onPressed: () {},
                            child: const Text("Esqueceu a senha?"),
                          ),
                        ),
                        const SizedBox(height: 10),

                        //Botão Login (usa Theme)
                        SizedBox(
                          width: double.infinity,
                          height: 50,
                          child: ElevatedButton(
                            onPressed: _login,
                            child: const Text("Entrar"),
                          ),
                        ),
                        const SizedBox(height: 20),
                        Visibility(
                          visible: viewModel.erroMessage != null,
                          child: Text(
                            viewModel.erroMessage ?? '',
                            style: TextStyle(
                              color: Theme.of(context).colorScheme.error,
                            ),
                          ),
                        ),
                        //Cadastro
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              "Não tem uma conta? ",
                              style: AppTextStyles.body,
                            ),
                            GestureDetector(
                              onTap: () {},
                              child: Text(
                                "Cadastre-se",
                                style: AppTextStyles.link,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
