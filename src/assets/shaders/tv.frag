#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float dcorner(in vec2 st,in float size){
      return 1.-step(size,dot(st,vec2(1.,1.0))) +
             1.-step(size,dot(st-1.,vec2(-1.0,-1.0))) +
     			step(1.-size,dot(st,vec2(-1.,1.))) +
     			step(1.-size,dot(st,vec2(1.,-1.)));
}

float scorner(in vec2 st,in float size){
    return (step(1.-size,st.x) * step(1.-size,st.y)) +
    ((1.-step(size,st.x)) * step(1.-size,st.y)) +
    ((1.-step(size,st.x)) * (1.-step(size,st.y))) +
    ((step(1.-size,st.x)) * (1.-step(size,st.y)));
}

float bars(in vec2 st,in float size){
    return (step(1.-size,st.x)) +
    (step(1.-size,st.y)) +
    ((1.-step(size,st.x))) +
    ((1.-step(size,st.y)));
}

float smoothbars(in vec2 st,in float size){
   return smoothstep(size,0.0,st.y) +
          smoothstep(1.-size,1.,st.y) +
          smoothstep(1.-size,1.,st.x) +
          smoothstep(size,0.0,st.x);
}
 
void main(){
   vec2 st = gl_FragCoord.xy/u_resolution.xy;
   st.x *= u_resolution.x/u_resolution.y;
   if(u_resolution.x/u_resolution.y > 1.1 || u_resolution.x/u_resolution.y < 0.9 ){
       st.x -= 0.5;
   }

   //f6ae00
   vec3 orange = vec3(0.96,0.68,0.0);
   //c0f5fc
   vec3 blue = vec3(0.75,0.96,0.98);
   

   vec3 color = orange;
   if(sign(sin(u_time*3.)) == 1.0){
      color = blue;
   }

   vec3 bar_color = vec3(0.0) - (color * smoothbars(st,0.2));

   color += bar_color * bars(st,0.1);

   gl_FragColor = vec4(color,1.0);


}