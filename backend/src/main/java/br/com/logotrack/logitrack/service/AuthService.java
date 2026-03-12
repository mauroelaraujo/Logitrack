package br.com.logotrack.logitrack.service;

import br.com.logotrack.logitrack.dto.AuthRequestDTO;
import br.com.logotrack.logitrack.dto.AuthResponseDTO;
import br.com.logotrack.logitrack.dto.RegisterRequestDTO;
import br.com.logotrack.logitrack.model.Role;
import br.com.logotrack.logitrack.model.Usuario;
import br.com.logotrack.logitrack.repository.UsuarioRepository;
import br.com.logotrack.logitrack.sec.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public AuthResponseDTO registrar(RegisterRequestDTO dto) {
        log.info("Registrando usuário com email {}", dto.email());
        if (usuarioRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado: " + dto.email());
        }
        Usuario usuario = Usuario.builder()
                .nome(dto.nome())
                .email(dto.email())
                .senha(passwordEncoder.encode(dto.senha()))
                .role(Role.USER)
                .build();
        usuarioRepository.save(usuario);
        String token = jwtUtil.gerarToken(usuario.getEmail(), usuario.getRole().name());
        return new AuthResponseDTO(token, "Bearer", usuario.getEmail(), usuario.getRole().name());
    }

    public AuthResponseDTO autenticar(AuthRequestDTO dto) {
        log.info("Autenticando usuário com email {}", dto.email());
        Usuario usuario = usuarioRepository.findByEmail(dto.email())
                .orElseThrow(() -> new BadCredentialsException("Credenciais inválidas"));
        if (!passwordEncoder.matches(dto.senha(), usuario.getSenha())) {
            throw new BadCredentialsException("Credenciais inválidas");
        }
        String token = jwtUtil.gerarToken(usuario.getEmail(), usuario.getRole().name());
        return new AuthResponseDTO(token, "Bearer", usuario.getEmail(), usuario.getRole().name());
    }
}
