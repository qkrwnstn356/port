import React, { useEffect, useRef, useState } from 'react';

const PlatFormer = () => {
    const canvasRef = useRef(null);
    const [level, setLevel] = useState(1);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 충돌 감지 함수 추가
        const checkCollision = (rect1, rect2) => {
            return rect1.x < rect2.x + rect2.width &&
                   rect1.x + rect1.width > rect2.x &&
                   rect1.y < rect2.y + rect2.height &&
                   rect1.y + rect1.height > rect2.y;
        };

        // 키보드 이벤트 핸들러 추가
        const handleKeyDown = (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    gameState.keys.left = true;
                    break;
                case 'ArrowRight':
                    gameState.keys.right = true;
                    break;
                case 'ArrowUp':
                case ' ':
                    gameState.keys.up = true;
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    gameState.keys.left = false;
                    break;
                case 'ArrowRight':
                    gameState.keys.right = false;
                    break;
                case 'ArrowUp':
                case ' ':
                    gameState.keys.up = false;
                    break;
                default:
                    break;
            }
        };

        // 게임 상태
        const gameState = {
            player: {
                x: 50,
                y: 200,
                width: 30,
                height: 30,
                speed: 5,
                jumpForce: 12,
                gravity: 0.5,
                velocityY: 0,
                isJumping: false,
                direction: 'right',
                frame: 0,
                frameCount: 0
            },
            camera: {
                x: 0,
                y: 0
            },
            platforms: [
                { x: 0, y: 580, width: 2400, height: 20 }, // 긴 바닥을 아래쪽으로 이동
                { x: 300, y: 300, width: 100, height: 20 },
                { x: 600, y: 250, width: 200, height: 20 },
                { x: 900, y: 200, width: 200, height: 20 },
                { x: 300, y: 320, width: 200, height: 20 },
                { x: 1500, y: 250, width: 200, height: 20 },
                { x: 1800, y: 200, width: 200, height: 20 },
            ],
            keys: {
                left: false,
                right: false,
                up: false
            },
            currentLevel: 1,
            levelComplete: false
        };

        // 레벨 설정
        const levels = {
            1: {
                platforms: gameState.platforms, // 모든 플랫폼을 사용하도록 수정
                endX: 1200,
                backgroundColor: '#87CEEB'  // 하늘색
            },
            2: {
                platforms: gameState.platforms,
                endX: 2400,
                backgroundColor: '#000080'  // 남색
            },
            3: {
                platforms: gameState.platforms,
                endX: 3600,
                backgroundColor: '#4B0082'
            }
        };

        // 플랫폼 충돌 체크 함수
        const isOverlapping = (newPlatform) => {
            return gameState.platforms.some(platform => {
                return (
                    newPlatform.x < platform.x + platform.width &&
                    newPlatform.x + newPlatform.width > platform.x &&
                    newPlatform.y < platform.y + platform.height &&
                    newPlatform.y + newPlatform.height > platform.y
                );
            });
        };

        // 랜덤한 위치에 짧은 바닥 추가
        const addRandomPlatforms = (count) => {
            let addedCount = 0; // 추가된 플랫폼 수
            while (addedCount < count) {
                const width = Math.random() * 150 + 50; // 50~200 사이의 랜덤 너비
                const x = Math.random() * (1500 - width); // 캔버스 너비 내에서 랜덤 X 위치
                const y = Math.random() * (420 - 20) + 300; // 긴 바닥 위에만 생성 (300~420 사이)

                const newPlatform = { x, y, width, height: 20 };

                // 겹치지 않으면 추가
                if (!isOverlapping(newPlatform)) {
                    gameState.platforms.push(newPlatform);
                    addedCount++;
                }
            }
        };
        addRandomPlatforms(5);
        // 레벨 설정 함수
        const setCurrentLevel = (levelNum) => {
            gameState.currentLevel = levelNum;
            gameState.platforms = levels[levelNum].platforms;
            gameState.levelComplete = false;
            setLevel(levelNum);
        };

        // 플레이어 애니메이션 업데이트
        const updatePlayerAnimation = () => {
            gameState.player.frameCount++;
            if (gameState.player.frameCount >= 5) { // 매 5프레임마다 애니메이션 변경
                gameState.player.frame = (gameState.player.frame + 1) % 4;
                gameState.player.frameCount = 0;
            }
        };

        // 플레이어 업데이트
        const updatePlayer = () => {
            // 좌우 이동
            if (gameState.keys.left) {
                gameState.player.x -= gameState.player.speed;
                gameState.player.direction = 'left';
            }
            if (gameState.keys.right) {
                gameState.player.x += gameState.player.speed;
                gameState.player.direction = 'right';
            }
        
            // 중력 적용
            gameState.player.velocityY += gameState.player.gravity;
            gameState.player.y += gameState.player.velocityY;
        
            // 플랫폼 충돌 체크
            gameState.platforms.forEach(platform => {
                if (checkCollision(gameState.player, platform)) {
                    if (gameState.player.velocityY > 0) {
                        gameState.player.isJumping = false;
                        gameState.player.velocityY = 0;
                        gameState.player.y = platform.y - gameState.player.height;
                    } else if (gameState.player.velocityY < 0) {
                        gameState.player.velocityY = 0;
                        gameState.player.y = platform.y + platform.height;
                    }
                }
            });
        
            // 점프
            if (gameState.keys.up && !gameState.player.isJumping) {
                gameState.player.velocityY = -gameState.player.jumpForce;
                gameState.player.isJumping = true;
            }
        
            // 레벨 경계 체크
            if (gameState.player.x < 0) {
                gameState.player.x = 0;
            }
            if (levels[gameState.currentLevel]) {
                const currentLevelEndX = levels[gameState.currentLevel].endX;
                if (gameState.player.x + gameState.player.width > currentLevelEndX) {
                    gameState.player.x = currentLevelEndX - gameState.player.width;
                }
            }
        
            updatePlayerAnimation();
        };
        setCurrentLevel(1);
        // 카메라 업데이트 함수 추가
        const updateCamera = () => {
            // 플레이어가 화면 중앙에 오도록 카메라 위치 조정
            const targetX = gameState.player.x - canvas.width / 2 + gameState.player.width / 2;
            
            // 부드러운 카메라 이동 (감속도 조정)
            gameState.camera.x += (targetX - gameState.camera.x) * 0.1;
            
            // 카메라가 레벨 경계에 벗어나지 않도록 제한
            if (levels[gameState.currentLevel]) {  // levels 객체 확인
                const currentLevelEndX = levels[gameState.currentLevel].endX;
                gameState.camera.x = Math.max(0, Math.min(gameState.camera.x, 
                    currentLevelEndX - canvas.width));
            }
        };

        // 독수리 상태 추가
        const createEagle = () => ({
            x: Math.random() * 1500,
            y: Math.random() * 550, // Y 좌표를 550으로 제한하여 캔버스 내에서만 움직이도록 설정
            width: 50,
            height: 50,
            speed: 2,
            directionX: Math.random() < 0.5 ? 1 : -1, // 랜덤 X 방향
            directionY: Math.random() < 0.5 ? 1 : -1  // 랜덤 Y 방향
        });
        
        // 독수리 배열 생성
        let eagles = Array.from({ length: 8 }, createEagle);

        // 독수리 업데이트 함수 추가
        const updateEagles = () => {
            eagles.forEach(eagle => {
                eagle.x += eagle.speed * eagle.directionX;
                eagle.y += eagle.speed * eagle.directionY;
        
                // 벽에 부딪히면 방향 전환
                if (eagle.x < 0 || eagle.x + eagle.width > 1500) {
                    eagle.directionX *= -1;
                }
                if (eagle.y < 0 || eagle.y + eagle.height > 600) { // Y 좌표를 600으로 제한
                    eagle.directionY *= -1;
                }
            });
        };

        const checkEagleCollision = () => {
            eagles.forEach(eagle => {
                if (checkCollision(gameState.player, eagle)) {
                    gameState.levelComplete = true; // 게임 오버
                }
            });
        };

        const restartGame = () => {
            gameState.levelComplete = false;
            gameState.currentLevel = 1;
            gameState.player.x = 50;
            gameState.player.y = 200;
            gameState.platforms = levels[1].platforms; // 초기 레벨 플랫폼 설정
            eagles = Array.from({ length: 8 }, createEagle); // 독수리 재생성
        };


        // 게임 렌더링
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            eagles.forEach(eagle => {
                ctx.font = '40px Arial'; // 독수리 크기 증가
                ctx.fillText('🦅', eagle.x, eagle.y); // 독수리 이모지 그리기
            });

            // 게임 오버 메시지
            if (gameState.levelComplete) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#fff';
                ctx.font = '40px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('게임 오버!', canvas.width / 2, canvas.height / 2 - 20);
                ctx.font = '20px Arial';
                ctx.fillText('R 키를 눌러서 재시작하세요.', canvas.width / 2, canvas.height / 2 + 20);
            }
        
            // 카메라 위치를 고려한 오브젝트 렌더링
            ctx.save();
            ctx.translate(-Math.floor(gameState.camera.x), 0);
        
            // 플랫폼 그리기
            ctx.fillStyle = '#8B4513';
            gameState.platforms.forEach(platform => {
                // 화면에 보이는 플랫폼만 렌더링
                if (platform.x + platform.width > gameState.camera.x && 
                    platform.x < gameState.camera.x + canvas.width) {
                    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
                }
            });
        
            // 플레이어 그리기
            ctx.fillStyle = '#FF0000';
            const bounceOffset = Math.sin(gameState.player.frame * Math.PI / 2) * 3;
            const playerOffset = 20;
            ctx.font = '30px Arial'; // 폰트 크기를 줄여서 플레이어를 작게 만듭니다.
            ctx.fillText('👨‍🚀', // 귀여운 꼬마 이모지로 변경
                gameState.player.x,
                gameState.player.y + playerOffset - bounceOffset
            );
            ctx.restore();
        
            // UI는 카메라와 독립적으로 그리기
            ctx.fillStyle = '#000'; // 텍스트 색상
            ctx.font = '20px Arial';
            ctx.textAlign = 'center'; // 텍스트 중앙 정렬
            ctx.fillText(`현재 레벨: ${level}`, canvas.width / 2, 30); // 캔버스 중앙에 배치
        
            // 게임 오버 메시지
            if (gameState.levelComplete) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#fff';
                ctx.font = '40px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('게임 오버!', canvas.width / 2, canvas.height / 2 - 20);
                ctx.font = '20px Arial';
                ctx.fillText('R 키를 눌러서 재시작하세요.', canvas.width / 2, canvas.height / 2 + 20);
            }
        };

        // 게임 루프
        const gameLoop = () => {
            if (!gameState.levelComplete) {
                updatePlayer();
                updateCamera();
                updateEagles(); // 독수리 업데이트 추가
                checkEagleCollision(); // 독수리와 충돌 체크
            }
            render();
            requestAnimationFrame(gameLoop);
        };
        
        // 이벤트 리스너 등록
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' && gameState.levelComplete) {
                restartGame(); // R 키로 게임 재시작
            } else {
                handleKeyDown(e); // 기존 키 이벤트 처리
            }
        });
        document.addEventListener('keyup', handleKeyUp);

        // 초기 레벨 설정
        setCurrentLevel(1);

        // 게임 시작
        gameLoop();

        // 클린업
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [level]); // level을 의존성 배열에 추가

    return (
        <div>
            <p>현재 레벨: {level}</p>
            <canvas
                ref={canvasRef}
                width={1500}
                height={600}
                style={{
                    border: '2px solid #000',
                    borderRadius: '5px'
                }}
            />
        </div>
    );
};

export default PlatFormer;