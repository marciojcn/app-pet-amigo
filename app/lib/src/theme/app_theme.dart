import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_text_styles.dart';

class AppTheme {
  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,

    //Cores principais
    primaryColor: AppColors.primary,
    scaffoldBackgroundColor: AppColors.background,

    colorScheme: ColorScheme.light(
      primary: AppColors.primary,
      secondary: AppColors.secondary,
      error: AppColors.error,
    ),

    //Tipografia global
    textTheme: const TextTheme(
      headlineLarge: AppTextStyles.titleLarge,
      headlineMedium: AppTextStyles.titleMedium,
      bodyLarge: AppTextStyles.body,
      bodyMedium: AppTextStyles.bodyLight,
    ),

    //Botões
    /*elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
        foregroundColor: AppColors.white,
        textStyle: AppTextStyles.button,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        minimumSize: const Size(double.infinity, 50),
      ),
    ),
    */
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ButtonStyle(
        backgroundColor: WidgetStatePropertyAll(AppColors.primary),
        foregroundColor: WidgetStatePropertyAll(AppColors.white),
        textStyle: WidgetStatePropertyAll(
          AppTextStyles.button,
          /*const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            fontStyle: FontStyle.italic, // aqui funciona melhor
          ),*/
        ),
      ),
    ),
    //Inputs
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.white,

      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: AppColors.disabled),
      ),

      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: AppColors.disabled),
      ),

      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: AppColors.primary),
      ),
    ),

    //TextButton
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(foregroundColor: AppColors.primary),
    ),
  );
}
