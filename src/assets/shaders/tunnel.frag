#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(float val, float plot){
    return step(plot-0.01,val) - step(plot+0.01,val);
}

void main() {
    float alpha = 1.;
    // *Camera movement*
    float speed = 0.2;
    float len_x = 0.4;
    float len_y = 0.4;

    vec2 norm = gl_FragCoord.xy / u_resolution.xy;
    vec2 center = vec2(0.5);
    
    vec2 vdist = norm-center;
    float dist = abs(length(vdist) * 1.);

    float res = u_resolution.x / 16.;
    
    res *= dist;
    
    norm.x += sin(u_time * speed) * len_x;
    norm.y += cos(u_time * speed) * len_y;

    float stretch_y = 1.;
    float stretch_x = 4.;

    float x_10 = ceil(ceil((norm.x * res) * stretch_y));
    float y_10 = ceil(ceil((norm.y * res) * stretch_x));
    
    float x_mod = mod(x_10,2.);
    float x_mod3 = mod(x_10,3.);
    float y_mod = mod(y_10,2.);
    float y_mod3 = mod(y_10,3.);
    
    vec3 color = vec3(0.);
    
    vec3 red = vec3(1.0,0.0,0.0);
    vec3 green = vec3(0.0,1.0,0.0);
    vec3 blue= vec3(0.0,0.0,1.0);

    if(x_mod == y_mod){
        color += vec3(0.0,0.0,1.0);
    }else if(x_mod == 0.){
        color += vec3(1.0,0.0,0.0);
    }else if(y_mod == 0.){
        color += vec3(0.0,1.0,0.0);
    }
    
    
    // Calculate offset based on y position (0, 1, or 2)
    //float offset = (y_mod3 == 0.) ? 0. : (y_mod == 0.) ? 1. : 2.;

    // Determine base color index from x position (0, 1, or 2)
    //float colorIndex = (x_mod3 == 0.) ? 0. : (x_mod == 0.) ? 1. : 2.;

    // Rotate color index by offset
    //colorIndex = mod((colorIndex + offset),3.);

    //color += (colorIndex == 0.) ? red : (colorIndex == 1.) ? blue : green;
    
    float border = 1.-step(0.5,dist);

    color += step(0.49,dist) * vec3(1.);

    color *= border;
    alpha *= border;

    gl_FragColor = vec4(color,alpha);
}
