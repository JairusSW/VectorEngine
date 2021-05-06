if (x > 0) {
    x = 0 - x
    // +0.3 becomes -0.3
  } else if (x < 0) {
    x = Math.abs(x)
    // -0.3 becomes +0.3
  }

  console.log(x)