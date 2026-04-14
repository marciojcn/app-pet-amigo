import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppDarkTheme {

  static ThemeData darkTheme = ThemeData(

    brightness: Brightness.dark,

    scaffoldBackgroundColor: AppColors.dark,

    colorScheme: ColorScheme.dark(
      primary: AppColors.primary,
      secondary: AppColors.secondary,
      error: AppColors.error,
    ),

    textTheme: const TextTheme(
      headlineLarge: TextStyle(
        fontSize: 28,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
      bodyLarge: TextStyle(
        fontSize: 16,
        color: Colors.white70,
      ),
    ),

    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
      ),
    ),

    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.medium,

      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
  );
}