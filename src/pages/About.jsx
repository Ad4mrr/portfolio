export default function AI() {
  return (
    <div style={{ padding: "80px", color: "white", background: "#111", minHeight: "100vh" }}>
      <h1>Neural Systems</h1>
      <p>Deepfake Detection Framework</p>

      <video
        width="800"
        controls
        style={{ marginTop: "40px", borderRadius: "10px" }}
      >
        <source src="/videos/ai-demo.mp4" type="video/mp4" />
      </video>

      <section style={{ marginTop: "40px" }}>
        <h2>Tech Stack</h2>
        <ul>
          <li>TensorFlow</li>
          <li>CNN + LSTM</li>
          <li>Grad-CAM / SHAP</li>
          <li>Edge Deployment</li>
        </ul>
      </section>
    </div>
  );
}