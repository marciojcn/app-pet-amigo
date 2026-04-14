import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppTextStyles {
  //Títulos
  static const titleLarge = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: AppColors.dark,
  );

  static const titleMedium = TextStyle(
    fontSize: 22,
    fontWeight: FontWeight.w600,
    color: AppColors.dark,
  );

  //Corpo
  static const body = TextStyle(fontSize: 16, color: AppColors.medium);

  static const bodyLight = TextStyle(fontSize: 14, color: AppColors.lightText);

  //Botões
  static const button = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
  );

  //Links
  static const link = TextStyle(
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: FontWeight.w600,
  );
}
