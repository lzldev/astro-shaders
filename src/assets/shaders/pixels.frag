
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
    vec2 sp = gl_FragCoord.xy / u_resolution.xy;

    float dist = (0.5 - sp.x) + (0.5 - sp.y);

    float sizex = 40. * sin(u_time*0.5) * 40.;
    float sizey = 40. * cos(u_time*0.5) * 40.;

    float mul2 = 10. * sin(u_time);

    float xx = cos((sp.x) * sizex) * mul2;
    float xy = sin((sp.y) * sizey) * mul2;
    
    vec3 color =  ((1.-(xx - xy)) * vec3(sp.x,sp.y,1.)) + vec3(0.);

    gl_FragColor = vec4(color,1.);
}