#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(float val, float plot){
    return step(plot-0.005,val) - step(plot+0.005,val);
}

float splot(float val, float plot){
    return smoothstep(plot-0.005,plot,val) - smoothstep(plot,plot+0.005,val);
}

float plot(float val, float plot,float t){
    return step(plot-t,val) - step(plot+t,val);
}

float splot(float val, float plot,float t){
    return smoothstep(plot-t,plot,val) - smoothstep(plot,plot+t,val);
}

void main() {
    vec2 sp = gl_FragCoord.xy / u_resolution.xy;
    
    float y = sp.x;
    float y2 = smoothstep(.5,1.,sp.x);
    
    vec3 line_color = vec3(1.);
    vec3 line2_color = vec3(0.,1.,0.);

    vec3 color = vec3(sp.x,sp.y,1.);

    float plt = plot(y,sp.y,0.003);
    float plt2 = plot(y2,sp.y,0.003);

    float crossx = splot(0.5,sp.x,0.001);
    float crossy = splot(0.5,sp.y,0.001);
    
    color = (1. * crossx * color) 
         + (1. * crossy * color) 
         + color;
          
          
    if(plt != 0.){
        gl_FragColor = vec4(line_color,1.0);
    }else if(plt2 != 0.) {
        gl_FragColor = vec4(line2_color,1.0);
    }else{
        gl_FragColor = vec4(color,1.0);
    }
}