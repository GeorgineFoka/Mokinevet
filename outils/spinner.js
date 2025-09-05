// Spinner.js
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

/**
 * Spinner simple, noir et circulaire.
 * Props:
 *  - size (number) diamètre en px
 *  - thickness (number) épaisseur de l'anneau
 *  - color (string) couleur
 *  - duration (number) durée d'une rotation en ms
 */
export default function Spinner({ size = 40, thickness = 4, color = "#000", duration = 900 }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    // animation loop with native driver
    const anim = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true, // essentiel pour fluidité (offload sur le thread natif)
      })
    );

    animationRef.current = anim;
    anim.start();

    return () => {
      // stop and reset value on unmount
      if (animationRef.current && animationRef.current.stop) {
        animationRef.current.stop();
      }
      rotateAnim.setValue(0);
    };
  }, [rotateAnim, duration]);

  // Interpolation de 0->1 vers 0deg->360deg
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Le rendu : un Animated.View avec un "gap" (borderTopColor transparent) pour l'effet spinner
  return (
    <View style={[{ width: size, height: size, alignItems: "center", justifyContent: "center" }]}>
      <Animated.View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: thickness,
            borderColor: color,
            borderTopColor: "transparent", // crée la "fente" visible pendant la rotation
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    // nothing else needed, transform applied inline
  },
});