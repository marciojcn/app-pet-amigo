import 'package:app_petamigo/src/pages/home_page.dart';
import 'package:app_petamigo/src/pages/login_page.dart';
import 'package:app_petamigo/src/theme/app_theme.dart';
import 'package:app_petamigo/src/viewnodel/login_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AppPetamigo extends StatelessWidget {
  const AppPetamigo({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [ChangeNotifierProvider(create: (_)=>LoginViewModel())],
      child: MaterialApp(
        title: "PetAmigo",
        debugShowCheckedModeBanner: false,
        //Tema Claro
        theme: AppTheme.lightTheme,
        //Tema Escuro
        darkTheme: AppTheme.lightTheme,
        //Segue o sistema do usuário
        themeMode: ThemeMode.system,
        //rotas das paginas
        routes: {
          '/': (_) => LoginPage(),
          '/home':(_) => HomePage(),
        },
      ),
    );
  }
}
