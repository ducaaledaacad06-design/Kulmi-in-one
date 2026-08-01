import React, { useState, useTransition, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, ActivityIndicator, ScrollView, Switch } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [authStep, setAuthStep] = useState('Splash');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const [isFabOpen, setIsFabOpen] = useState(false);
  const [activeHomeTab, setActiveHomeTab] = useState('AI Feed');
  const [marketCategory, setMarketCategory] = useState('All');
  
  // Advanced Settings State
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleNavigation = useCallback((screen) => {
    startTransition(() => {
      setCurrentScreen(screen);
      setIsFabOpen(false);
    });
  }, []);

  const handleAuthNavigation = useCallback((step) => {
    startTransition(() => {
      setAuthStep(step);
    });
  }, []);

  const marketItems = useMemo(() => [
    { id: '1', title: 'iPhone 17 Pro Max 1TB Titanium', price: '$1,450', loc: 'Mogadishu', rating: '4.9 ⭐', verified: true, category: 'Phones' },
    { id: '2', title: 'Modern Smart Luxury Villa', price: '$280,000', loc: 'Hargeisa', rating: '5.0 ⭐', verified: true, category: 'Houses' },
    { id: '3', title: 'MacBook Pro M4 Max 64GB', price: '$3,200', loc: 'Bosaso', rating: '4.8 ⭐', verified: false, category: 'Electronics' },
    { id: '4', title: 'Tesla Cyber Electric SUV', price: '$65,000', loc: 'Kismayo', rating: '4.9 ⭐', verified: true, category: 'Cars' },
    { id: '5', title: 'AI Automated Trading Bot Pro', price: '$450', loc: 'Nairobi', rating: '4.7 ⭐', verified: true, category: 'Software' }
  ], []);

  const chatItems = useMemo(() => [
    { id: '1', name: 'Ayaan Abdi', msg: 'Walaal koodkii mashruuca ma soo dirtay?', time: '12:40 PM', unread: 2 },
    { id: '2', name: 'Kulmi-in-one VIP Official Channel', msg: 'System V10 successfully deployed with EAS! 🚀', time: '11:15 AM', unread: 5 },
    { id: '3', name: 'Secret Encrypted Vault', msg: 'Zero-knowledge self-destruct active 🔒', time: 'Yesterday', unread: 0 },
    { id: '4', name: 'Ducaale Daacad', msg: 'App-ka naqshadiisa waa mid cajiib ah!', time: '2 days ago', unread: 0 }
  ], []);

  if (authStep !== 'App') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, !isDarkMode && styles.lightContainer]}>
          <ScrollView contentContainerStyle={styles.authContainer} showsVerticalScrollIndicator={false}>
            
            {authStep === 'Splash' && (
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%', minHeight: height * 0.8}}>
                <View style={styles.logoGlowLarge}>
                  <Text style={styles.logoMainTxtLg}>K</Text>
                </View>
                <Text style={styles.authTitle}>Kulmi-in-one <Text style={{color: '#FFD700'}}>V10</Text></Text>
                <Text style={styles.authSub}>The Ultimate Super Ecosystem</Text>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => handleAuthNavigation('Welcome')}>
                  <Text style={styles.primaryBtnTxt}>Get Started 🚀</Text>
                </TouchableOpacity>
              </View>
            )}

            {authStep === 'Welcome' && (
              <View style={{width: '100%', alignItems: 'center', flex: 1, justifyContent: 'center', minHeight: height * 0.8}}>
                <View style={styles.logoGlow}>
                  <Text style={styles.logoMainTxt}>K</Text>
                </View>
                <Text style={styles.authTitle}>Welcome to Kulmi-in-one</Text>
                <Text style={styles.authSub}>Connect, Buy, Sell, Pay and Build with Neural AI</Text>
                <View style={{width: '100%', marginTop: 30}}>
                  <TouchableOpacity style={styles.primaryBtn} onPress={() => handleAuthNavigation('Language')}>
                    <Text style={styles.primaryBtnTxt}>Create Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryBtn} onPress={() => handleAuthNavigation('Login')}>
                    <Text style={styles.secondaryBtnTxt}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ghostBtn} onPress={() => handleAuthNavigation('App')}>
                    <Text style={styles.ghostBtnTxt}>Continue as Guest</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {authStep === 'Language' && (
              <View style={{width: '100%', flex: 1, justifyContent: 'center', minHeight: height * 0.8}}>
                <Text style={styles.authTitle}>Choose Language</Text>
                <Text style={styles.authSub}>Select your regional localization</Text>
                {['Somali (Soomaali)', 'English', 'Arabic (العربية)', 'Swahili', 'French'].map((lang, i) => (
                  <TouchableOpacity key={i} style={styles.selectionCard} onPress={() => handleAuthNavigation('Country')}>
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>{lang}</Text>
                    <Ionicons name="chevron-forward" size={16} color="#FFD700" />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={() => handleAuthNavigation('Welcome')} style={{marginTop: 15, alignItems: 'center'}}>
                  <Text style={{color: '#888', fontSize: 12}}>← Back</Text>
                </TouchableOpacity>
              </View>
            )}

            {authStep === 'Country' && (
              <View style={{width: '100%', flex: 1, justifyContent: 'center', minHeight: height * 0.8}}>
                <Text style={styles.authTitle}>Select Country & Region</Text>
                <Text style={styles.authSub}>Configure multi-currency and network gateways</Text>
                {['Somalia (+252)', 'Djibouti (+253)', 'Kenya (+254)', 'UAE (+971)', 'United Kingdom (+44)'].map((c, i) => (
                  <TouchableOpacity key={i} style={styles.selectionCard} onPress={() => handleAuthNavigation('Signup')}>
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>{c}</Text>
                    <Ionicons name="checkmark-circle" size={18} color="#FFD700" />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={() => handleAuthNavigation('Language')} style={{marginTop: 15, alignItems: 'center'}}>
                  <Text style={{color: '#888', fontSize: 12}}>← Back</Text>
                </TouchableOpacity>
              </View>
            )}

            {authStep === 'Signup' && (
              <View style={{width: '100%', paddingVertical: 20}}>
                <Text style={styles.authTitle}>Create Account</Text>
                <Text style={styles.authSub}>Join the decentralized secure network</Text>
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#888" />
                <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#888" />
                <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#888" />
                <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#888" />
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry />
                <TouchableOpacity style={styles.primaryBtn} onPress={() => handleAuthNavigation('OTP')}>
                  <Text style={styles.primaryBtnTxt}>Continue to OTP Verification</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAuthNavigation('Country')} style={{marginTop: 15, alignItems: 'center'}}>
                  <Text style={{color: '#888', fontSize: 12}}>← Back</Text>
                </TouchableOpacity>
              </View>
            )}

            {authStep === 'Login' && (
              <View style={{width: '100%', flex: 1, justifyContent: 'center', minHeight: height * 0.8}}>
                <Text style={styles.authTitle}>Welcome Back</Text>
                <Text style={styles.authSub}>Sign in securely with biometrics or password</Text>
                <TextInput style={styles.input} placeholder="Email, Phone or Username" placeholderTextColor="#888" />
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry />
                <TouchableOpacity style={styles.primaryBtn} onPress={() => handleAuthNavigation('App')}>
                  <Text style={styles.primaryBtnTxt}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAuthNavigation('Welcome')} style={{marginTop: 15, alignItems: 'center'}}>
                  <Text style={{color: '#888', fontSize: 12}}>← Back to Welcome</Text>
                </TouchableOpacity>
              </View>
            )}

            {authStep === 'OTP' && (
              <View style={{width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: height * 0.8}}>
                <Ionicons name="shield-checkmark-outline" size={48} color="#FFD700" />
                <Text style={[styles.authTitle, {marginTop: 10}]}>Security Verification</Text>
                <Text style={styles.authSub}>Enter 6-digit confirmation code</Text>
                <TextInput style={[styles.input, {textAlign: 'center', fontSize: 18, letterSpacing: 8}]} placeholder="• • • • • •" placeholderTextColor="#888" maxLength={6} />
                <TouchableOpacity style={styles.primaryBtn} onPress={() => handleAuthNavigation('ProfileSetup')}>
                  <Text style={styles.primaryBtnTxt}>Verify & Continue</Text>
                </TouchableOpacity>
              </View>
            )}

            {authStep === 'ProfileSetup' && (
              <View style={{width: '100%', paddingVertical: 20}}>
                <Text style={styles.authTitle}>Setup Your Profile</Text>
                <Text style={styles.authSub}>Customize your digital identity</Text>
                <TextInput style={styles.input} placeholder="Bio / Status Message" placeholderTextColor="#888" />
                <TextInput style={styles.input} placeholder="Profession / Business Title" placeholderTextColor="#888" />
                <TextInput style={styles.input} placeholder="City & Country" placeholderTextColor="#888" />
                <TouchableOpacity style={styles.primaryBtn} onPress={() => handleAuthNavigation('SecuritySetup')}>
                  <Text style={styles.primaryBtnTxt}>Save & Setup Security</Text>
                </TouchableOpacity>
              </View>
            )}

            {authStep === 'SecuritySetup' && (
              <View style={{width: '100%', flex: 1, justifyContent: 'center', minHeight: height * 0.8}}>
                <Text style={styles.authTitle}>Security & Passkeys</Text>
                <Text style={styles.authSub}>Protect your wallet and encrypted messages</Text>
                {['Enable Face ID / Biometrics', 'Create Secure 6-Digit PIN', 'Activate Two-Factor Auth (2FA)'].map((sec, i) => (
                  <TouchableOpacity key={i} style={styles.selectionCard}>
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>{sec}</Text>
                    <Ionicons name="lock-closed" size={16} color="#FFD700" />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={[styles.primaryBtn, {marginTop: 20}]} onPress={() => handleAuthNavigation('App')}>
                  <Text style={styles.primaryBtnTxt}>Complete & Launch App</Text>
                </TouchableOpacity>
              </View>
            )}

          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainWrapper}>

          {/* ================= HOME SCREEN ================= */}
          {currentScreen === 'Home' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 90}}>
              <View style={styles.header}>
                <View style={styles.row}>
                  <View style={styles.smallLogo}><Text style={{color: '#FFD700', fontWeight: 'bold'}}>K</Text></View>
                  <Text style={styles.headerTitle}>Kulmi-in-one <Text style={{color: '#FFD700'}}>V10</Text></Text>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.topIcon} onPress={() => handleNavigation('AI')}><Ionicons name="sparkles" size={18} color="#FFD700" /></TouchableOpacity>
                  <TouchableOpacity style={styles.topIcon} onPress={() => handleNavigation('Wallet')}><Ionicons name="wallet-outline" size={18} color="#FFD700" /></TouchableOpacity>
                  <TouchableOpacity style={styles.topIcon} onPress={() => handleNavigation('Notifications')}><Ionicons name="notifications-outline" size={18} color="#FFD700" /></TouchableOpacity>
                </View>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginVertical: 6}}>
                {[
                  { name: 'AI Feed', icon: 'sparkles-outline' },
                  { name: 'Following', icon: 'people-outline' },
                  { name: 'Friends', icon: 'person-add-outline' },
                  { name: 'Nearby', icon: 'location-outline' },
                  { name: 'Videos', icon: 'videocam-outline' },
                  { name: 'Marketplace', icon: 'basket-outline' },
                  { name: 'Trending', icon: 'radio-outline' },
                  { name: 'Live Rooms', icon: 'tv-outline' }
                ].map((item, idx) => (
                  <TouchableOpacity 
                    key={idx}
                    style={[styles.chip, activeHomeTab === item.name && styles.chipActive]} 
                    onPress={() => {
                      setActiveHomeTab(item.name);
                      if (item.name === 'Marketplace') handleNavigation('Market');
                      if (item.name === 'Videos') handleNavigation('Reels');
                    }}>
                    <Ionicons name={item.icon} size={13} color={activeHomeTab === item.name ? '#121212' : '#FFD700'} style={{marginRight: 4}} />
                    <Text style={[styles.chipTxt, activeHomeTab === item.name && styles.chipTxtActive]}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.searchBar}>
                <Ionicons name="search" size={16} color="#FFD700" style={{marginRight: 8}} />
                <TextInput style={{flex: 1, color: '#FFF', fontSize: 12}} placeholder="Search Users, Marketplace, Reels, Channels, Jobs..." placeholderTextColor="#888" value={searchQuery} onChangeText={setSearchQuery} />
                <View style={styles.row}>
                  <TouchableOpacity style={{marginHorizontal: 4}}><Ionicons name="camera-outline" size={16} color="#FFD700" /></TouchableOpacity>
                  <TouchableOpacity style={{marginHorizontal: 4}}><Ionicons name="mic-outline" size={16} color="#FFD700" /></TouchableOpacity>
                </View>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginVertical: 8}}>
                {['Add Story', 'Ducaale Daacad', 'Ayaan Omar', 'Hassan Ali', 'Fadumo Xasan', 'Khaalid Dev'].map((item, index) => index === 0 ? (
                  <View key={index} style={styles.storyCardAdd}>
                    <View style={styles.storyRingAdd}><Ionicons name="add" size={20} color="#121212" /></View>
                    <Text style={styles.storyTxt}>Add Story (+)</Text>
                  </View>
                ) : (
                  <View key={index} style={styles.storyCard}>
                    <View style={styles.storyRing}><Ionicons name="person" size={16} color="#FFD700" /></View>
                    <Text style={styles.storyTxt} numberOfLines={1}>{item}</Text>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.glassCard}>
                <View style={styles.spaceBetween}>
                  <View style={styles.row}>
                    <View style={styles.avatarSm}><Ionicons name="person" size={12} color="#121212" /></View>
                    <View style={{marginLeft: 8}}>
                      <Text style={styles.authorTxt}>Ducaale Daacad • Verified Elite</Text>
                      <Text style={styles.timeTxt}>Just now • Neural Recommended</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <TouchableOpacity style={{marginRight: 8}}><Ionicons name="bookmark-outline" size={16} color="#FFD700" /></TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={16} color="#888" />
                  </View>
                </View>

                <Text style={styles.postText}>Kulmi-in-one V10 waa app-ka ugu casrisan ee isku xira ganacsiga, bulshada, iyo sirdoonka macmalka ah. React Native + Expo + EAS! 🚀🔥</Text>
                
                <View style={styles.mediaContainer}>
                  <Ionicons name="shield-checkmark" size={48} color="#FFD700" />
                  <Text style={{color: '#FFD700', fontSize: 11, fontWeight: 'bold', marginTop: 6}}>Encrypted Quantum HD Stream</Text>
                </View>

                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.actBtn}><Ionicons name="thumbs-up-outline" size={16} color="#FFD700" /><Text style={styles.actTxt}>Like</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.actBtn}><Ionicons name="chatbubble-outline" size={16} color="#FFD700" /><Text style={styles.actTxt}>Comment</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.actBtn}><Ionicons name="share-social-outline" size={16} color="#FFD700" /><Text style={styles.actTxt}>Share</Text></TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}

          {/* ================= MARKETPLACE SCREEN ================= */}
          {currentScreen === 'Market' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 90}}>
              <View style={styles.header}>
                <Text style={styles.sectionHeader}>Ultimate Marketplace</Text>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.topIcon}><Ionicons name="heart-outline" size={18} color="#FFD700" /></TouchableOpacity>
                  <TouchableOpacity style={styles.topIcon}><Ionicons name="cart-outline" size={18} color="#FFD700" /></TouchableOpacity>
                </View>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginVertical: 6}}>
                {['All', 'Cars', 'Houses', 'Phones', 'Electronics', 'Fashion', 'Jobs', 'Software', 'Hotels'].map((cat) => (
                  <TouchableOpacity key={cat} style={[styles.chip, marketCategory === cat && styles.chipActive]} onPress={() => setMarketCategory(cat)}>
                    <Text style={[styles.chipTxt, marketCategory === cat && styles.chipTxtActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.gridContainer}>
                {marketItems.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.marketCard}>
                    <View style={styles.marketImgBox}>
                      <Ionicons name="cube" size={28} color="#FFD700" />
                      {item.verified && <View style={styles.badgeOverlay}><Ionicons name="shield-checkmark" size={12} color="#FFD700" /></View>}
                    </View>
                    <Text style={styles.marketTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.marketPrice}>{item.price}</Text>
                    <View style={styles.spaceBetween}>
                      <Text style={styles.marketLoc}>{item.loc}</Text>
                      <Text style={{color: '#FFD700', fontSize: 9}}>{item.rating}</Text>
                    </View>
                    <View style={styles.marketActionRow}>
                      <TouchableOpacity style={styles.marketBtnSm}><Text style={styles.marketBtnTxt}>Buy Now</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.marketBtnSmOutline}><Text style={styles.marketBtnTxtOutline}>Offer</Text></TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}

          {/* ================= REELS SCREEN ================= */}
          {currentScreen === 'Reels' && (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 80}}>
              <View style={styles.reelsBox}>
                <Ionicons name="videocam" size={48} color="#FFD700" />
                <Text style={styles.reelsTitle}>TikTok Style Infinite Reels V10</Text>
                <Text style={styles.reelsSub}>Auto-play, Neural Subtitles, Live Gifts, Duet & Speed Control</Text>
              </View>
            </View>
          )}

          {/* ================= CHATS SCREEN ================= */}
          {currentScreen === 'Chats' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 90}}>
              <View style={styles.header}>
                <Text style={styles.sectionHeader}>Secure Chats & Channels</Text>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.topIcon}><Ionicons name="videocam-outline" size={18} color="#FFD700" /></TouchableOpacity>
                  <TouchableOpacity style={styles.topIcon}><Ionicons name="call-outline" size={18} color="#FFD700" /></TouchableOpacity>
                </View>
              </View>

              {chatItems.map((c) => (
                <TouchableOpacity key={c.id} style={styles.chatRow}>
                  <View style={styles.avatarSm}><Ionicons name="person" size={14} color="#121212" /></View>
                  <View style={{flex: 1, marginLeft: 10}}>
                    <View style={styles.spaceBetween}>
                      <Text style={styles.authorTxt}>{c.name}</Text>
                      <Text style={styles.timeTxt}>{c.time}</Text>
                    </View>
                    <Text style={styles.chatPreview}>{c.msg}</Text>
                  </View>
                  {c.unread > 0 && <View style={styles.unreadBadge}><Text style={{color: '#121212', fontSize: 9, fontWeight: 'bold'}}>{c.unread}</Text></View>}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* ================= PROFILE SCREEN ================= */}
          {currentScreen === 'Profile' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 90}}>
              <View style={styles.header}>
                <Text style={styles.sectionHeader}>Creator & Business Profile</Text>
                <TouchableOpacity style={styles.topIcon} onPress={() => handleNavigation('Settings')}><Ionicons name="settings-outline" size={18} color="#FFD700" /></TouchableOpacity>
              </View>

              <View style={styles.profileBox}>
                <View style={styles.avatarLg}><Ionicons name="person" size={28} color="#121212" /></View>
                <Text style={styles.profileName}>Ducaale Daacad <Ionicons name="checkmark-circle" size={14} color="#FFD700" /></Text>
                <Text style={styles.profileHandle}>@ducaale_daacad • Verified Elite Creator</Text>
                <Text style={styles.profileBio}>Building Kulmi-in-one V10 Ultimate Ecosystem. 🚀 Mobile Native Developer.</Text>

                <View style={styles.profileStatsRow}>
                  <View style={{alignItems: 'center'}}><Text style={styles.statNum}>25.4K</Text><Text style={styles.statLbl}>Followers</Text></View>
                  <View style={{alignItems: 'center'}}><Text style={styles.statNum}>510</Text><Text style={styles.statLbl}>Following</Text></View>
                  <View style={{alignItems: 'center'}}><Text style={styles.statNum}>3.4M</Text><Text style={styles.statLbl}>Views</Text></View>
                </View>
              </View>
            </ScrollView>
          )}

          {/* ================= SUPER WALLET SCREEN ================= */}
          {currentScreen === 'Wallet' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 90}}>
              <View style={styles.header}>
                <Text style={styles.sectionHeader}>Super Wallet & Finance</Text>
                <TouchableOpacity style={styles.topIcon} onPress={() => handleNavigation('Home')}><Ionicons name="close" size={18} color="#FFD700" /></TouchableOpacity>
              </View>

              <View style={styles.walletCard}>
                <Text style={{color: '#FFD700', fontWeight: 'bold', fontSize: 12}}>KULMI V10 QUANTUM SUPER WALLET</Text>
                <Text style={{color: '#AAA', fontSize: 11, marginTop: 12}}>Total Combined Assets</Text>
                <Text style={{color: '#FFD700', fontSize: 26, fontWeight: 'bold', marginVertical: 4}}>$94,500.00</Text>
                
                <Text style={{color: '#FFD700', fontWeight: 'bold', fontSize: 11, marginTop: 16}}>Integrated Gateways & Blockchains</Text>
                <View style={styles.walletGrid}>
                  {['Binance', 'USDT', 'Solana', 'Bitcoin', 'ZAAD', 'Sahal', 'eDahab', 'Visa', 'Mastercard', 'Apple Pay', 'PayPal'].map((w, i) => (
                    <TouchableOpacity key={i} style={styles.walletChip}><Text style={{color: '#FFD700', fontSize: 9, fontWeight: 'bold'}}>{w}</Text></TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          )}

          {/* ================= AI NEURAL CORE SCREEN ================= */}
          {currentScreen === 'AI' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 90}}>
              <View style={styles.header}>
                <Text style={styles.sectionHeader}>Kulmi Neural Core AI</Text>
                <TouchableOpacity style={styles.topIcon} onPress={() => handleNavigation('Home')}><Ionicons name="close" size={18} color="#FFD700" /></TouchableOpacity>
              </View>

              <View style={styles.aiHero}>
                <Ionicons name="sparkles" size={32} color="#FFD700" />
                <Text style={styles.aiTitle}>Advanced Neural Intelligence Studio</Text>
                <Text style={styles.aiSub}>Generate custom mobile architectures, media streams, automated codebases, and trading insights instantly.</Text>
              </View>
            </ScrollView>
          )}

          {/* ================= SETTINGS SCREEN ================= */}
          {currentScreen === 'Settings' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 90}}>
              <View style={styles.header}>
                <Text style={styles.sectionHeader}>Advanced Settings</Text>
                <TouchableOpacity style={styles.topIcon} onPress={() => handleNavigation('Home')}><Ionicons name="close" size={18} color="#FFD700" /></TouchableOpacity>
              </View>

              <View style={styles.selectionCard}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="moon-outline" size={18} color="#FFD700" style={{marginRight: 10}} />
                  <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 12}}>Dark Theme Mode</Text>
                </View>
                <Switch value={isDarkMode} onValueChange={setIsDarkMode} trackColor={{ false: '#333', true: '#FFD700' }} thumbColor="#121212" />
              </View>

              <View style={styles.selectionCard}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="finger-print-outline" size={18} color="#FFD700" style={{marginRight: 10}} />
                  <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 12}}>Biometric Authentication</Text>
                </View>
                <Switch value={biometricEnabled} onValueChange={setBiometricEnabled} trackColor={{ false: '#333', true: '#FFD700' }} thumbColor="#121212" />
              </View>

              <View style={styles.selectionCard}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="notifications-outline" size={18} color="#FFD700" style={{marginRight: 10}} />
                  <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 12}}>Push Notifications</Text>
                </View>
                <Switch value={pushNotifications} onValueChange={setPushNotifications} trackColor={{ false: '#333', true: '#FFD700' }} thumbColor="#121212" />
              </View>

              {['Account Security', 'Privacy & Data', 'Wallet Preferences', 'Localization & Language', 'Help Center & Support', 'EAS Build Logs'].map((item, index) => (
                <TouchableOpacity key={index} style={styles.selectionCard}>
                  <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 12}}>{item}</Text>
                  <Ionicons name="chevron-forward" size={16} color="#FFD700" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* ================= NOTIFICATIONS SCREEN ================= */}
          {currentScreen === 'Notifications' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 90}}>
              <View style={styles.header}>
                <Text style={styles.sectionHeader}>Activity & Notifications</Text>
                <TouchableOpacity style={styles.topIcon} onPress={() => handleNavigation('Home')}><Ionicons name="close" size={18} color="#FFD700" /></TouchableOpacity>
              </View>
              {['Marketplace Orders', 'Wallet Deposits', 'New Followers', 'AI Neural Sync', 'System Updates'].map((item, index) => (
                <TouchableOpacity key={index} style={styles.chatRow}>
                  <Ionicons name="notifications" size={16} color="#FFD700" style={{marginRight: 10}} />
                  <View style={{flex: 1}}>
                    <Text style={styles.authorTxt}>{item}</Text>
                    <Text style={styles.chatPreview}>Your account activity stream has a new update.</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

        </View>

        {isPending && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#FFD700" />
          </View>
        )}

        {/* ================= FAB MODAL / POPUP ================= */}
        {isFabOpen && (
          <View style={styles.fabModalContainer}>
            <TouchableOpacity style={{flex: 1}} onPress={() => setIsFabOpen(false)} />
            <View style={styles.fabMenuBox}>
              <Text style={{color: '#FFD700', fontWeight: 'bold', fontSize: 13, marginBottom: 12}}>Create & Quick Actions</Text>
              {[
                { name: '➕ Create Post', action: () => handleNavigation('Home') },
                { name: '📹 Record Reel', action: () => handleNavigation('Reels') },
                { name: '🛒 Sell Product', action: () => handleNavigation('Market') },
                { name: '🤖 AI Studio', action: () => handleNavigation('AI') }
              ].map((item, i) => (
                <TouchableOpacity key={i} style={styles.fabMenuItem} onPress={item.action}>
                  <Text style={{color: '#FFF', fontSize: 12, fontWeight: '600'}}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={14} color="#FFD700" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ================= BOTTOM NAVIGATION ================= */}
        <View style={styles.bottomNav}>
          {[
            { name: 'Home', icon: 'home' },
            { name: 'Market', icon: 'basket' },
            { name: 'Create', icon: 'add', special: true },
            { name: 'Reels', icon: 'videocam' },
            { name: 'Chats', icon: 'chatbubbles' },
            { name: 'Profile', icon: 'person' }
          ].map((item, i) => (
            <TouchableOpacity key={i} style={styles.navItem} onPress={() => {
              if (item.name === 'Create') {
                setIsFabOpen(!isFabOpen);
              } else {
                setIsFabOpen(false);
                handleNavigation(item.name);
              }
            }}>
              {item.special ? (
                <View style={styles.fabButton}>
                  <Ionicons name={isFabOpen ? 'close' : 'add'} size={24} color="#121212" />
                </View>
              ) : (
                <>
                  <Ionicons name={item.icon} size={20} color={currentScreen === item.name ? '#FFD700' : '#888'} />
                  <Text style={[styles.navTxt, currentScreen === item.name && styles.navTxtActive]}>{item.name}</Text>
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  lightContainer: { backgroundColor: '#F8F9FA' },
  authContainer: { padding: 20, justifyContent: 'center', alignItems: 'center', flexGrow: 1 },
  logoGlow: { width: 64, height: 64, borderRadius: 20, backgroundColor: '#1E1E1E', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFD700', marginBottom: 12 },
  logoGlowLarge: { width: 90, height: 90, borderRadius: 25, backgroundColor: '#1E1E1E', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFD700', marginBottom: 16 },
  logoMainTxt: { color: '#FFD700', fontSize: 28, fontWeight: 'bold' },
  logoMainTxtLg: { color: '#FFD700', fontSize: 40, fontWeight: 'bold' },
  authTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  authSub: { color: '#888', fontSize: 11, marginTop: 4, marginBottom: 20, textAlign: 'center' },
  input: { width: '100%', backgroundColor: '#1E1E1E', padding: 12, borderRadius: 14, color: '#FFF', fontSize: 12, marginBottom: 10, borderWidth: 1, borderColor: '#333' },
  selectionCard: { width: '100%', backgroundColor: '#1E1E1E', padding: 14, borderRadius: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#333' },
  primaryBtn: { width: '100%', backgroundColor: '#FFD700', padding: 14, borderRadius: 14, alignItems: 'center', marginTop: 6 },
  primaryBtnTxt: { color: '#121212', fontWeight: 'bold', fontSize: 13 },
  secondaryBtn: { width: '100%', backgroundColor: '#1E1E1E', padding: 14, borderRadius: 14, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#333' },
  secondaryBtnTxt: { color: '#FFD700', fontWeight: 'bold', fontSize: 13 },
  ghostBtn: { width: '100%', padding: 10, alignItems: 'center', marginTop: 8 },
  ghostBtnTxt: { color: '#888', fontSize: 12 },

  mainWrapper: { flex: 1, paddingHorizontal: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  spaceBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  headerTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 15, marginLeft: 8 },
  sectionHeader: { color: '#FFD700', fontWeight: 'bold', fontSize: 15 },
  smallLogo: { width: 26, height: 26, borderRadius: 8, backgroundColor: '#1E1E1E', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFD700' },
  topIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#1E1E1E', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333', marginLeft: 6 },

  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 8, borderWidth: 1, borderColor: '#FFD70033' },
  
  storyCardAdd: { width: 60, height: 80, backgroundColor: '#FFD700', borderRadius: 14, marginRight: 8, justifyContent: 'center', alignItems: 'center' },
  storyCard: { width: 60, height: 80, backgroundColor: '#1E1E1E', borderRadius: 14, marginRight: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  storyRing: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#FFD700', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2A2A2A', marginBottom: 4 },
  storyRingAdd: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', marginBottom: 4 },
  storyTxt: { color: '#AAA', fontSize: 9 },

  glassCard: { backgroundColor: '#1E1E1E', padding: 12, borderRadius: 20, marginBottom: 10, borderWidth: 1, borderColor: '#333' },
  avatarSm: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center' },
  authorTxt: { color: '#FFF', fontWeight: 'bold', fontSize: 11 },
  timeTxt: { color: '#888', fontSize: 9 },
  postText: { color: '#DDD', fontSize: 12, marginVertical: 8 },
  mediaContainer: { width: '100%', height: 130, backgroundColor: '#161616', borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  
  postActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 6, paddingTop: 4 },
  actBtn: { flexDirection: 'row', alignItems: 'center' },
  actTxt: { color: '#FFD700', fontSize: 10, fontWeight: '600', marginLeft: 2 },

  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#1E1E1E', borderRadius: 12, marginRight: 6, borderWidth: 1, borderColor: '#333' },
  chipActive: { backgroundColor: '#FFD700' },
  chipTxt: { color: '#AAA', fontSize: 10, fontWeight: '600' },
  chipTxtActive: { color: '#121212', fontWeight: 'bold' },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  marketCard: { width: '48%', backgroundColor: '#1E1E1E', borderRadius: 16, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#333', marginHorizontal: '1%' },
  marketImgBox: { width: '100%', height: 90, backgroundColor: '#161616', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  marketTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 11 },
  marketPrice: { color: '#FFD700', fontWeight: 'bold', fontSize: 12, marginVertical: 2 },
  marketLoc: { color: '#888', fontSize: 9 },
  badgeOverlay: { position: 'absolute', top: 6, right: 6, backgroundColor: '#121212', padding: 2, borderRadius: 6 },
  marketActionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  marketBtnSm: { flex: 1, backgroundColor: '#FFD700', padding: 6, borderRadius: 8, alignItems: 'center', marginRight: 4 },
  marketBtnSmOutline: { flex: 1, backgroundColor: '#161616', padding: 6, borderRadius: 8, alignItems: 'center', marginLeft: 4, borderWidth: 1, borderColor: '#FFD70055' },
  marketBtnTxt: { color: '#121212', fontSize: 10, fontWeight: 'bold' },
  marketBtnTxtOutline: { color: '#FFD700', fontSize: 10, fontWeight: 'bold' },

  reelsBox: { width: '90%', backgroundColor: '#1E1E1E', borderRadius: 20, justifyContent: 'center', alignItems: 'center', padding: 20, borderWidth: 1, borderColor: '#333' },
  reelsTitle: { color: '#FFD700', fontWeight: 'bold', fontSize: 13, marginTop: 10, textAlign: 'center' },
  reelsSub: { color: '#AAA', fontSize: 10, textAlign: 'center', marginTop: 4, marginBottom: 12 },

  chatRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 10, borderRadius: 16, marginBottom: 8, borderWidth: 1, borderColor: '#333' },
  chatPreview: { color: '#AAA', fontSize: 10, marginTop: 2 },
  unreadBadge: { backgroundColor: '#FFD700', width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },

  profileBox: { backgroundColor: '#1E1E1E', borderRadius: 20, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  avatarLg: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  profileName: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  profileHandle: { color: '#FFD700', fontSize: 10, marginBottom: 4 },
  profileBio: { color: '#AAA', fontSize: 10, textAlign: 'center', marginBottom: 10 },
  profileStatsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#333', marginBottom: 10 },
  statNum: { color: '#FFD700', fontWeight: 'bold', fontSize: 13 },
  statLbl: { color: '#888', fontSize: 9 },

  walletCard: { backgroundColor: '#1E1E1E', padding: 16, borderRadius: 20, borderWidth: 1, borderColor: '#FFD70055' },
  walletGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  walletChip: { backgroundColor: '#161616', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, margin: 3, borderWidth: 1, borderColor: '#333' },

  aiHero: { backgroundColor: '#1E1E1E', borderRadius: 20, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#FFD70055' },
  aiTitle: { color: '#FFD700', fontWeight: 'bold', fontSize: 13, marginTop: 8, textAlign: 'center' },
  aiSub: { color: '#AAA', fontSize: 10, textAlign: 'center', marginTop: 4, marginBottom: 12 },

  loadingOverlay: { position: 'absolute', top: 10, right: 10, zIndex: 99 },

  fabModalContainer: { position: 'absolute', bottom: 70, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.7)', height: height, justifyContent: 'flex-end', zIndex: 99 },
  fabMenuBox: { backgroundColor: '#1E1E1E', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, borderWidth: 1, borderColor: '#FFD70055' },
  fabMenuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#333' },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: '#121212', borderTopWidth: 1, borderTopColor: '#222', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navTxt: { color: '#888', fontSize: 9, marginTop: 2, fontWeight: '500' },
  navTxtActive: { color: '#FFD700', fontWeight: 'bold' },
  fabButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', marginBottom: 10, shadowColor: '#FFD700', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 6 }
});
