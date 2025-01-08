#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;
  
  st -= vec2(1.,0.);

  // Make the distance field
	d = min(length(abs(st)-0.33) , length(abs(st)-0.66));
	d = min(d,length(abs(st)-vec2(0.66,0)));
	d = min(d,length(abs(st)-vec2(0.,0.66)));
    d = min(d,length(abs(st)-vec2(1.132,0.)));
    d = min(d,length(abs(st)-vec2(1.)));
    d = min(d,length(abs(st)-vec2(0.)));
    
    float freq = 1.;
    d += sin(u_time * freq);

// d = min(length(abs(st)-0.3) , length(abs(st)-0.6));
  // d = length( min(abs(st)-.3,0.) );
  // d = length( max(abs(st)-.3,0.) );

  // Visualize the distance field
  gl_FragColor = vec4(vec3(fract(d*10.0)),1.0);
  
  //gl_FragColor *= vec4(st + 1.,1.0,1.0);

  // Drawing with the distance field
  // gl_FragColor = vec4(vec3( step(.1,d) ),1.0);
  // gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
  // gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
}